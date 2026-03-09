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
      await supabase
        .from('users')
        .upsert({ 
          wallet_address: walletAddress.toLowerCase(),
          last_seen: new Date().toISOString()
        }, { onConflict: 'wallet_address' });
    } catch (err) {
      console.error("Supabase sync failed:", err);
    }
  };

  const updateWeb3State = async (walletAddress: string) => {
    if (typeof window.ethereum === "undefined") return;
    
    try {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      const ethersSigner = await ethersProvider.getSigner();
      const ajooContract = await initContract(ethersSigner);

      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setAccount(walletAddress);
      setContract(ajooContract);

      await syncUserWithSupabase(walletAddress);
    } catch (error) {
      console.error("Failed to update Web3 state:", error);
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install a Web3 wallet like MetaMask!");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        await updateWeb3State(accounts[0]);
      }
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
            await updateWeb3State(accounts[0]);
          }
        } catch (error) {
          console.error("Auto-connect failed:", error);
        }
      }
    };
    
    tryAutoConnect();

    if (typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (newAccounts: string[]) => {
        if (newAccounts.length > 0) {
          updateWeb3State(newAccounts[0]);
        } else {
          setAccount(null);
          setSigner(null);
          setContract(null);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
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
