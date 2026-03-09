import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import AjooGroupABI from "./AjooGroupABI.json";
import { supabase } from "./supabase";

// The AjooGroup contract address from the deployment on Avalanche Fuji
const CONTRACT_ADDRESS = "0xe9412467a7cb0deabd24c2044758ffa945f87bd3";

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
  zkProof: string | null; // For future ZKLogin support
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
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [zkProof, setZkProof] = useState<string | null>(null);

  const initContract = async (currentSigner: ethers.JsonRpcSigner) => {
    return new ethers.Contract(
      CONTRACT_ADDRESS,
      AjooGroupABI.abi,
      currentSigner
    );
  };

  const syncUserWithSupabase = async (walletAddress: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({ 
          wallet_address: walletAddress.toLowerCase(),
          last_seen: new Date().toISOString()
        }, { onConflict: 'wallet_address' });

      if (error) console.error("Error syncing user with Supabase:", error);
    } catch (err) {
      console.error("Supabase sync failed:", err);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install a Web3 wallet like MetaMask to use this feature!");
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const ethersSigner = await ethersProvider.getSigner();
      const ajooContract = await initContract(ethersSigner);

      const walletAddress = accounts[0];
      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setAccount(walletAddress);
      setContract(ajooContract);

      // Sync with Supabase off-chain storage
      await syncUserWithSupabase(walletAddress);

    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const tryAutoConnect = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            const ethersProvider = new ethers.BrowserProvider(window.ethereum);
            const ethersSigner = await ethersProvider.getSigner();
            const ajooContract = await initContract(ethersSigner);
            
            const walletAddress = accounts[0];
            setProvider(ethersProvider);
            setSigner(ethersSigner);
            setAccount(walletAddress);
            setContract(ajooContract);

            await syncUserWithSupabase(walletAddress);
          }
        } catch (error) {
          console.error("Auto-connect failed:", error);
        }
      }
    };
    
    tryAutoConnect();

    // Setup network listener
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length > 0) {
          const newAccount = newAccounts[0];
          setAccount(newAccount);
          syncUserWithSupabase(newAccount);
          window.location.reload(); 
        } else {
          setAccount(null);
          setSigner(null);
          setContract(null);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{ provider, signer, account, contract, connectWallet, isConnecting, zkProof }}
    >
      {children}
    </Web3Context.Provider>
  );
};
