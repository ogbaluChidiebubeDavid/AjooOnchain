import { ethers } from "ethers";
import AjooGroupABI from "./AjooGroupABI.json";

// Deployed contract address on local Anvil (Fuji fork)
export const AJOO_GROUP_ADDRESS = "0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3";

// Helper to get the web3 provider
export const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    // Connect to user's wallet (e.g., Core or MetaMask)
    return new ethers.BrowserProvider(window.ethereum);
  }
  // Fallback to local Anvil node if no wallet is connected
  return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
};

// Helper to get the contract instance
export const getContract = async (withSigner = false) => {
  const provider = getProvider();
  
  if (withSigner && typeof window !== "undefined" && window.ethereum) {
    // If we need a signer (to send transactions), prompt user to connect wallet
    const signer = await provider.getSigner();
    return new ethers.Contract(AJOO_GROUP_ADDRESS, AjooGroupABI, signer);
  }
  
  // Return read-only contract
  return new ethers.Contract(AJOO_GROUP_ADDRESS, AjooGroupABI, provider);
};
