# AJOO Onchain 🚀

**Multiply Your Wealth Together.**

AJOO is a decentralized fintech protocol that digitizes traditional West African "Ajo/Esusu" rotational savings models on the Avalanche blockchain. By combining collective savings with DeFi yield generation, AJOO turns traditional savings circles into income-generating assets.

---

## 🌟 Core Features

- **Decentralized Rotational Savings:** Create or join automated "Ajo" circles where members contribute stablecoins at regular intervals.
- **DeFi Yield Generation:** Pooled funds are automatically supplied to **Aave V3** on Avalanche, generating interest for all members while they wait for their payout.
- **Automated Payouts:** Powered by **Chainlink Automation**, the protocol automatically triggers payouts to the next person in the rotation as soon as conditions are met.
- **Web3 Native Identity:** Full integration with **Web3Modal (Reown AppKit)**, allowing users to connect via MetaMask, Trust Wallet, Coinbase Wallet, or by scanning a QR code from their mobile device.
- **Off-Chain Metadata Sync:** Supabase integration ensures fast dashboard loading and secure storage of non-critical group details (names, descriptions).
- **Graceful Liquidation:** Built-in safety mechanisms to protect honest contributors if a member fails to pay their share.

---

## 🏗️ Technical Architecture

### 1. Smart Contracts (Foundry)
- **`AjooFactory.sol`**: The entry point for users to deploy their own custom savings circles. It maintains a registry of all active groups.
- **`AjooGroup.sol`**: The core logic handler for each circle. It manages contributions, Aave interactions, rotation indices, and payout distributions.

### 2. Frontend (React + Vite)
- A high-performance, responsive dashboard built with **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.
- **`Web3Context`**: Manages the global connection state, provider synchronization, and user identity across the application using Web3Modal.
- **TanStack Query**: Handles efficient data fetching and caching from both the blockchain and Supabase.

---

## 🔺 Avalanche Technical Stack

AJOO leverages the high-performance Avalanche ecosystem to provide a seamless and scalable savings experience:

- **Avalanche C-Chain:** Our smart contracts are deployed on the C-Chain for EVM compatibility and sub-second finality.
- **Avalanche Fuji Testnet:** The current environment for testing and public demonstration.
- **Avalanche Warp Messaging (AWM):** (Architecture Plan) Utilizing AWM for trustless cross-chain savings communication.
- **Avalanche Teleporter:** (Architecture Plan) Built on AWM to facilitate cross-subnet asset transfers and data sharing.
- **Core Wallet Integration:** Optimized for the native Avalanche wallet experience.

---

## 🛠️ General Tools Used

- **Smart Contracts:** Solidity, Foundry (Forge, Cast, Anvil).
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- **Web3 Integration:** Ethers.js (v6), Web3Modal / Reown AppKit, WalletConnect.
- **Database & Off-chain:** Supabase (PostgreSQL, Edge Functions, Realtime).
- **DeFi Protocols:** Aave V3 (Avalanche Fuji).
- **Infrastructure:** Chainlink Automation (Keepers), Vercel (Deployment).

---

## 🔗 On-Chain Verification

The core Factory contract is deployed and verified on the **Avalanche Fuji Testnet**:

- **Factory Address:** `0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3`
- **Snowtrace Explorer:** [https://testnet.snowtrace.io/address/0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3](https://testnet.snowtrace.io/address/0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3)
- **Avalanche Explorer:** [https://subnets-test.avax.network/c-chain/address/0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3](https://subnets-test.avax.network/c-chain/address/0xE9412467A7cB0DeABD24C2044758Ffa945f87bd3)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Foundry** (for smart contract development)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dev-Basscee/AjooOnchain.git
   cd AjooOnchain
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_PROJECT_ID=your_walletconnect_project_id
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 💡 Troubleshooting

### Blank Screen on Deployment
If the application displays a blank screen in production, ensure that the browser polyfills for `global` and `process` are present in `index.html`. This is required for some Web3 libraries (like WalletConnect) to function correctly in a Vite environment.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

---

**Built with ❤️ for the future of decentralized finance.**
