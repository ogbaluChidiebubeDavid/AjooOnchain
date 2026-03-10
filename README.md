# AJOO Onchain 🚀

**Multiply Your Wealth Together.**

AJOO is a decentralized fintech protocol that digitizes traditional West African "Ajo/Esusu" rotational savings models on the Avalanche blockchain. By combining the power of collective savings with decentralized finance (DeFi) yield generation, AJOO turns traditional, stagnant savings circles into dynamic, income-generating assets.

---

## 📖 What is AJOO?

In many cultures around the world, friends, family, or colleagues form "savings circles." Every cycle (e.g., weekly or monthly), each member contributes a fixed amount of money to a central pool. At the end of the cycle, one member takes the entire pool. This rotates until everyone has received a payout. 

While effective, traditional savings circles face several problems:
- **Trust Issues:** Relying on a central person to hold the funds.
- **Inflation/Stagnation:** The money sits idle in a bank or under a mattress, losing value over time.
- **Geographic Limitations:** It is difficult to manage circles with people across different borders or currencies.

**AJOO Onchain solves this.** It replaces the middleman with transparent smart contracts on the Avalanche blockchain and uses stablecoins (like USDC) to borderless, permissionless savings.

---

## ⚙️ How It Works

1. **Create a Circle:** A user acts as the host and launches a new savings circle. They define the rules: the contribution amount (e.g., 10 USDC), the duration of each cycle (e.g., 7 days), and the maximum number of participants.
2. **Join & Deposit:** Members connect their Web3 wallets and join the circle. When they deposit their required stablecoin contribution, the smart contract locks it securely.
3. **Yield Generation (The Magic):** While the pool of funds is waiting to be paid out, AJOO doesn't just let it sit idle. The smart contract automatically supplies the pooled stablecoins to the **Aave V3 Protocol** on Avalanche. The funds earn interest continuously.
4. **Automated Payouts:** Once the cycle duration is met and all members have contributed, **Chainlink Automation** (Keepers) automatically triggers the payout. The smart contract withdraws the funds from Aave (including the generated interest) and sends the entire pool to the current cycle's recipient.
5. **Rotation:** The recipient index moves to the next person, and the next cycle begins.

---

## 🌟 Core Features

- **Decentralized Rotational Savings:** Fully automated, trustless "Ajo" circles where smart contracts handle all custody and logic.
- **DeFi Yield Generation:** Pooled funds automatically earn interest via **Aave V3**, meaning the payout is often larger than the sum of the contributions.
- **Automated Payouts:** Powered by **Chainlink Automation**, the protocol guarantees timely distributions without human intervention.
- **Web3 Native Identity:** Seamless onboarding with **Web3Modal (Reown AppKit)**, supporting major wallets like MetaMask, Trust Wallet, and Coinbase Wallet.
- **Off-Chain Metadata Sync:** Supabase integration ensures a blazing-fast user interface by caching non-critical group details off-chain while maintaining on-chain absolute truth for funds.
- **Graceful Liquidation:** Built-in safety mechanisms and grace periods. If a member fails to pay their share, the protocol allows the group to liquidate and recover their funds fairly.

---

## 🏗️ Technical Architecture & Stack

### 1. Smart Contracts
- **`AjooFactory.sol`**: The entry point for users to deploy their own custom savings circles. It maintains an on-chain registry of all active groups.
- **`AjooGroup.sol`**: The core logic handler for each individual circle. It securely manages contributions, handles Aave yield interactions, tracks the rotation index, and interfaces with Chainlink Keepers for automated distributions.
- **Built with:** Solidity, Foundry.

### 2. Frontend Application
- A high-performance, responsive dashboard designed for an intuitive Web3 experience.
- **Built with:** React, Vite, TypeScript, Tailwind CSS, and shadcn/ui.
- **Web3 Integration:** Ethers.js (v6) and Web3Modal / Reown AppKit for wallet connection and transaction signing.
- **State Management:** TanStack Query for efficient data fetching, caching, and background synchronization between the blockchain and the frontend.

### 3. Avalanche Ecosystem
AJOO leverages the high-performance Avalanche network to provide a seamless, low-fee, and scalable savings experience:
- **Avalanche C-Chain:** Smart contracts are deployed here for full EVM compatibility, sub-second finality, and ultra-low transaction costs.
- **Avalanche Fuji Testnet:** The current environment for testing and public demonstration.

---

## 🔗 On-Chain Verification

The core Factory contract is deployed and verified on the **Avalanche Fuji Testnet**:

- **Factory Address:** `0x940fCaE3bAaBC3782F3309211e357481cEe73C36`
- **Transaction Hash:** `0xad8404bb9be392ce28d3483a6a4ba37badd63daf636f1c3e9f7037d66925663e`
- **Snowtrace Explorer:** [https://testnet.snowtrace.io/address/0x940fCaE3bAaBC3782F3309211e357481cEe73C36](https://testnet.snowtrace.io/address/0x940fCaE3bAaBC3782F3309211e357481cEe73C36)
- **Avalanche Explorer:** [https://subnets-test.avax.network/c-chain/address/0x940fCaE3bAaBC3782F3309211e357481cEe73C36](https://subnets-test.avax.network/c-chain/address/0x940fCaE3bAaBC3782F3309211e357481cEe73C36)

---

**Built with ❤️ for the future of decentralized finance.**
