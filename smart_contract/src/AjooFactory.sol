// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AjooGroup} from "./AjooGroup.sol";

/**
 * @title AjooFactory
 * @dev Factory contract to deploy new AjooGroup instances easily from the frontend.
 */
contract AjooFactory {
    address public feeTreasury;

    // Array to keep track of all deployed AjooGroups
    address[] public deployedGroups;
    
    // Mapping from creator address to the groups they've created
    mapping(address => address[]) public userGroups;

    event GroupCreated(
        address indexed groupAddress, 
        address indexed creator, 
        uint256 contributionAmount, 
        uint256 cycleDuration
    );

    constructor(address _feeTreasury) {
        feeTreasury = _feeTreasury;
    }

    /**
     * @dev Deploys a new AjooGroup contract.
     */
    function createGroup(
        address _stablecoin,
        address _aavePool,
        address _aToken,
        uint256 _contributionAmount,
        uint256 _cycleDuration,
        address[] memory _initialMembers
    ) external returns (address) {
        // Deploy the new AjooGroup
        AjooGroup newGroup = new AjooGroup(
            _stablecoin,
            _aavePool,
            _aToken,
            _contributionAmount,
            _cycleDuration,
            feeTreasury,
            _initialMembers
        );

        address groupAddress = address(newGroup);

        // Store references
        deployedGroups.push(groupAddress);
        userGroups[msg.sender].push(groupAddress);

        emit GroupCreated(groupAddress, msg.sender, _contributionAmount, _cycleDuration);

        return groupAddress;
    }

    /**
     * @dev Get all groups deployed by the factory.
     */
    function getAllGroups() external view returns (address[] memory) {
        return deployedGroups;
    }

    /**
     * @dev Get groups created by a specific user.
     */
    function getUserGroups(address user) external view returns (address[] memory) {
        return userGroups[user];
    }
}
