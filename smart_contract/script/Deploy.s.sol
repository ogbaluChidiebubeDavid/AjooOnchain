// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {AjooGroup} from "../src/AjooGroup.sol";

contract DeployAjoo is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        // Avalanche Fuji Addresses
        address usdc = 0x5425890298aed601595a70AB815c96711a31Bc65; 
        address aavePool = 0x794a61358D6845594F94dc1DB02A252b5b4814aD;
        address aUSDC = 0x65A04eC763f72AD8C5F4170707328E07340e698E;

        uint256 contributionAmount = 10 * 10**6; // 10 USDC (assuming 6 decimals)
        uint256 cycleDuration = 7 days;
        address feeTreasury = vm.envAddress("WALLET_ADDRESS"); // Use provided wallet as treasury

        address[] memory initialMembers = new address[](1);
        initialMembers[0] = vm.envAddress("WALLET_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        AjooGroup ajoo = new AjooGroup(
            usdc,
            aavePool,
            aUSDC,
            contributionAmount,
            cycleDuration,
            feeTreasury,
            initialMembers
        );

        vm.stopBroadcast();
    }
}
