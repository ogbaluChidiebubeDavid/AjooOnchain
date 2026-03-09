# AJOO Onchain 🚀

**Multiply Your Wealth Together.**

AJOO is a decentralized fintech protocol that digitizes traditional West African "Ajo/Esusu" rotational savings models on the Avalanche blockchain. By combining collective savings with DeFi yield generation, AJOO turns traditional savings circles into income-generating assets.

---

## 🌟 Core Features

- **Decentralized Rotational Savings:** Create or join automated "Ajo" circles where members contribute stablecoins at regular intervals.
- **DeFi Yield Generation:** Pooled funds are automatically supplied to **Aave V3** on Avalanche, generating interest for all members while they wait for their payout.
- **Automated Payouts:** Powered by **Chainlink Automation**, the protocol automatically triggers payouts to the next person in the rotation as soon as conditions are met.
- **Web3 Native Identity:** Full integration with **Web3Modal (WalletConnect)**, allowing users to connect via MetaMask, Trust Wallet, or by scanning a QR code from their mobile device.
- **Off-Chain Metadata Sync:** Supabase integration ensures fast dashboard loading and secure storage of non-critical group details (names, descriptions).
- **Graceful Liquidation:** Built-in safety mechanisms to protect honest contributors if a member fails to pay their share.

---

## 🏗️ Technical Architecture

### 1. Smart Contracts (Foundry)
- **`AjooFactory.sol`**: The entry point for users to deploy their own custom savings circles. It maintains a registry of all active groups.
- **`AjooGroup.sol`**: The core logic handler for each circle. It manages contributions, Aave interactions, rotation indices, and payout distributions.

### 2. Frontend (React + Vite)
- A high-performance, responsive dashboard built with **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.
- **`Web3Context`**: Manages the global connection state, provider synchronization, and user identity across the application.
- **TanStack Query**: Handles efficient data fetching and caching from both the blockchain and Supabase.

### 3. Backend & Infrastructure
- **Supabase**: Serves as the off-chain database for group metadata and user profiles.
- **Chainlink Keepers**: Monitor and execute `performUpkeep` on circles to automate the "Remittance Day" payouts.
- **Aave V3**: The underlying yield source for all pooled contributions.

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
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### Smart Contract Deployment

1. **Compile contracts:**
   ```bash
   cd smart_contract
   forge build
   ```

2. **Deploy to Avalanche Fuji:**
   ```bash
   forge script script/Deploy.s.sol --rpc-url <FUJI_RPC_URL> --broadcast --private-key <YOUR_PRIVATE_KEY>
   ```

---

## 🛠️ Deployment (Vercel)

The frontend is optimized for Vercel deployment. Ensure you add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel project environment variables.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

---

**Built with ❤️ for the future of decentralized finance.**
