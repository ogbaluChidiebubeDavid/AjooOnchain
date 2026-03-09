import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import AjooGroupABI from "./AjooGroupABI.json";
import { supabase } from "./supabase";
import { useLocation } from "wouter";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/react";

// The AjooFactory contract address from the deployment on Avalanche Fuji
const FACTORY_ADDRESS = "0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3";

// 1. Get projectId from https://cloud.walletconnect.com
// This is a public testing project ID. For production, replace with your own.
const projectId = "1336d396ebdd49dcd1e00d720b08a1c9";

// 2. Set chains
const avalancheFuji = {
  chainId: 43113,
  name: "Avalanche Fuji",
  currency: "AVAX",
  explorerUrl: "https://testnet.snowtrace.io/",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
};

// 3. Create a metadata object
const metadata = {
  name: "Ajoo Onchain",
  description: "Crosschain Rotational Savings Protocol",
  url: "https://ajoo-onchain.vercel.app",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  defaultChainId: 43113,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [avalancheFuji],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  contract: ethers.Contract | null; // Note: This refers to the Factory contract now based on earlier context
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
  zkProof: string | null;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const [, setLocation] = useLocation();

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [zkProof, setZkProof] = useState<string | null>(null);

  const initContract = async (currentSigner: ethers.JsonRpcSigner) => {
    return new ethers.Contract(
      FACTORY_ADDRESS, // You are binding the Factory contract here globally based on previous edits
      AjooGroupABI.abi, // Note: Ensure you use the Factory ABI if you are calling Factory methods like createGroup, but here it's still named AjooGroupABI.
      currentSigner
    );
  };

  const syncUserWithSupabase = async (walletAddress: string) => {
    try {
      await supabase
        .from("users")
        .upsert(
          {
            wallet_address: walletAddress.toLowerCase(),
            last_seen: new Date().toISOString(),
          },
          { onConflict: "wallet_address" }
        );
    } catch (err) {
      console.error("Supabase sync failed:", err);
    }
  };

  // Sync state when Web3Modal account changes
  useEffect(() => {
    const syncState = async () => {
      if (isConnected && address && walletProvider) {
        try {
          const ethersProvider = new ethers.BrowserProvider(walletProvider as any);
          const ethersSigner = await ethersProvider.getSigner();
          
          setProvider(ethersProvider);
          setSigner(ethersSigner);

          // We wait to initialize the global contract context just in case.
          // Note: Previously, you loaded AjooGroupABI against FACTORY_ADDRESS. 
          // If the modal creates a group, it needs the factory. If you join a group, you use the group contract directly.
          
          await syncUserWithSupabase(address);
        } catch (error) {
          console.error("Failed to sync ethers state:", error);
        }
      } else {
        setProvider(null);
        setSigner(null);
        setContract(null);
        // If they manually disconnect, send them home
        if (window.location.pathname !== "/") {
          setLocation("/");
        }
      }
    };

    syncState();
  }, [isConnected, address, walletProvider, setLocation]);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      await open(); // This opens the beautiful WalletConnect / Web3Modal UI
    } catch (error) {
      console.error("Error opening Web3Modal:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account: address || null,
        contract,
        connectWallet,
        isConnecting,
        zkProof,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
