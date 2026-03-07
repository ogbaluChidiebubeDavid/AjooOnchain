// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

// Minimal Interface for Aave V3 Pool
interface IPool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

/**
 * @title AjooGroup
 * @dev Decentralized rotational savings (Ajo/Esusu) on Avalanche C-Chain.
 * Integrates Aave for yield generation and Chainlink Keepers for automated payouts.
 */
contract AjooGroup is ReentrancyGuard, AutomationCompatibleInterface {
    using SafeERC20 for IERC20;

    IERC20 public stablecoin;
    IPool public aavePool;
    IERC20 public aToken;

    struct Member {
        address account;
        bool hasContributedThisCycle;
        uint256 totalContributed;
    }

    Member[] public members;
    // 1-indexed mapping to store member indices (0 means not a member)
    mapping(address => uint256) public memberIndices;
    
    uint256 public contributionAmount;
    uint256 public cycleDuration;
    uint256 public lastPayoutTimestamp;
    uint256 public currentRecipientIndex;
    uint256 public platformFeePercentage = 100; // 1% = 100 basis points (denominator: 10000)

    // Grace period before a forced payout can occur
    uint256 public constant GRACE_PERIOD = 3 days;

    address public feeTreasury;

    event DepositMade(address indexed member, uint256 amount);
    event PayoutDistributed(address indexed recipient, uint256 payoutAmount, uint256 interestShared);
    event GroupLiquidated(uint256 totalDistributed);

    constructor(
        address _stablecoin,
        address _aavePool,
        address _aToken,
        uint256 _contributionAmount,
        uint256 _cycleDuration,
        address _feeTreasury,
        address[] memory _initialMembers
    ) {
        stablecoin = IERC20(_stablecoin);
        aavePool = IPool(_aavePool);
        aToken = IERC20(_aToken); // The interest-bearing token received when supplying to Aave
        contributionAmount = _contributionAmount;
        cycleDuration = _cycleDuration;
        feeTreasury = _feeTreasury;
        lastPayoutTimestamp = block.timestamp;
        
        for (uint i = 0; i < _initialMembers.length; i++) {
            members.push(Member({
                account: _initialMembers[i],
                hasContributedThisCycle: false,
                totalContributed: 0
            }));
            // Store 1-indexed position
            memberIndices[_initialMembers[i]] = i + 1;
        }
    }

    // --- Core Functions ---

    /**
     * @dev Users deposit their contribution.
     * Can be called directly or via an ERC-4337 Paymaster/Smart Account.
     */
    function deposit() external nonReentrant {
        uint256 memberIndex = _getMemberIndex(msg.sender);
        require(!members[memberIndex].hasContributedThisCycle, "Already contributed this cycle");

        // Transfer stablecoin from user (Smart Account) to this contract
        stablecoin.safeTransferFrom(msg.sender, address(this), contributionAmount);
        
        members[memberIndex].hasContributedThisCycle = true;
        members[memberIndex].totalContributed += contributionAmount;

        // Automatically supply to Aave for yield generation
        stablecoin.safeIncreaseAllowance(address(aavePool), contributionAmount);
        aavePool.supply(address(stablecoin), contributionAmount, address(this), 0);

        emit DepositMade(msg.sender, contributionAmount);
    }

    // --- Chainlink Keepers Automation ---

    /**
     * @dev Chainlink Keeper checks if it's time to trigger the payout.
     */
    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp >= lastPayoutTimestamp + cycleDuration) && _allMembersContributed();
        return (upkeepNeeded, "");
    }

    /**
     * @dev Chainlink Keeper triggers the actual payout.
     */
    function performUpkeep(bytes calldata /* performData */) external override nonReentrant {
        require(block.timestamp >= lastPayoutTimestamp + cycleDuration, "Cycle duration not met");
        require(_allMembersContributed(), "Not all members have contributed");

        _distributePayout();
    }

    // --- Internal Logic ---

    function _distributePayout() internal {
        // Calculate total pooled principal
        uint256 totalPrincipal = contributionAmount * members.length;
        
        // 1. CAPTURE EXACT aTOKEN BALANCE
        uint256 aTokenBalance = aToken.balanceOf(address(this));
        
        // 2. WITHDRAW EXACT BALANCE FROM AAVE
        if (aTokenBalance > 0) {
            aavePool.withdraw(address(stablecoin), aTokenBalance, address(this));
        }

        uint256 actualBalance = stablecoin.balanceOf(address(this));
        uint256 interestGenerated = actualBalance > totalPrincipal ? actualBalance - totalPrincipal : 0;

        address currentRecipient = members[currentRecipientIndex].account;

        // Deduct next cycle's contribution for the recipient to keep them in the loop
        uint256 recipientPrincipalPayout = totalPrincipal - contributionAmount;

        // Calculate and deduct platform fee from the recipient's principal payout
        uint256 platformFee = (recipientPrincipalPayout * platformFeePercentage) / 10000;
        uint256 finalRecipientPayout = recipientPrincipalPayout - platformFee;

        // Transfer platform fee to treasury
        if (platformFee > 0) {
            stablecoin.safeTransfer(feeTreasury, platformFee);
        }

        // Transfer payout to the current recipient
        stablecoin.safeTransfer(currentRecipient, finalRecipientPayout);

        // Distribute generated interest to all members equally
        if (interestGenerated > 0) {
            uint256 interestPerMember = interestGenerated / members.length;
            for (uint i = 0; i < members.length; i++) {
                stablecoin.safeTransfer(members[i].account, interestPerMember);
            }
        }

        // Supply the auto-deducted contribution for the recipient back into Aave for the next cycle
        stablecoin.safeIncreaseAllowance(address(aavePool), contributionAmount);
        aavePool.supply(address(stablecoin), contributionAmount, address(this), 0);

        // Reset state for next cycle
        lastPayoutTimestamp = block.timestamp;
        for (uint i = 0; i < members.length; i++) {
            members[i].hasContributedThisCycle = false;
        }
        
        // Mark the recipient as having already contributed for the next cycle (auto-deducted)
        members[currentRecipientIndex].hasContributedThisCycle = true;
        members[currentRecipientIndex].totalContributed += contributionAmount;

        // Move to the next recipient in the rotation
        currentRecipientIndex = (currentRecipientIndex + 1) % members.length;

        emit PayoutDistributed(currentRecipient, finalRecipientPayout, interestGenerated);
    }

    /**
     * @dev Fallback mechanism if a member ghosts the group.
     * Can be called by anyone after the grace period to rescue funds.
     */
    function liquidateGroup() external nonReentrant {
        require(block.timestamp > lastPayoutTimestamp + cycleDuration + GRACE_PERIOD, "Grace period not over");
        require(!_allMembersContributed(), "All members contributed, automation should run");

        // Withdraw everything currently in Aave
        uint256 aTokenBalance = aToken.balanceOf(address(this));
        if (aTokenBalance > 0) {
            aavePool.withdraw(address(stablecoin), aTokenBalance, address(this));
        }

        uint256 totalBalance = stablecoin.balanceOf(address(this));
        require(totalBalance > 0, "No funds to liquidate");

        // Count how many honest members actually contributed this cycle
        uint256 honestContributorsCount = 0;
        for (uint i = 0; i < members.length; i++) {
            if (members[i].hasContributedThisCycle) {
                honestContributorsCount++;
            }
        }

        require(honestContributorsCount > 0, "No contributions to rescue");

        // Calculate the rescue share (principal + whatever interest accrued)
        uint256 sharePerMember = totalBalance / honestContributorsCount;

        // Distribute funds only to those who paid
        for (uint i = 0; i < members.length; i++) {
            if (members[i].hasContributedThisCycle) {
                // Reset state before transfer to prevent reentrancy
                members[i].hasContributedThisCycle = false; 
                stablecoin.safeTransfer(members[i].account, sharePerMember);
            }
        }

        emit GroupLiquidated(totalBalance);
        
        // Note: The contract state is now effectively dead. You can add logic
        // to slash the defaulting member or permanently pause the group here.
    }

    function _getMemberIndex(address _account) internal view returns (uint256) {
        uint256 indexPlusOne = memberIndices[_account];
        require(indexPlusOne > 0, "Not a group member");
        
        // Convert back to 0-indexed for the array
        return indexPlusOne - 1; 
    }

    function _allMembersContributed() internal view returns (bool) {
        for (uint i = 0; i < members.length; i++) {
            if (!members[i].hasContributedThisCycle) {
                return false;
            }
        }
        return true;
    }
}
