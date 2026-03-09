// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AjooFactory} from "../src/AjooFactory.sol";

contract DeployAjoo is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        address feeTreasury = vm.envAddress("WALLET_ADDRESS"); // Use provided wallet as treasury

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Factory
        AjooFactory factory = new AjooFactory(feeTreasury);
        console.log("AjooFactory deployed at:", address(factory));

        vm.stopBroadcast();
    }
}
