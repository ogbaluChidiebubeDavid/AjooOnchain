# Ajoo Onchain Architecture Flow

## 1. Onboarding & Group Creation (Account Abstraction - ERC-4337)
- **User Onboarding:** A user signs up via the frontend. An ERC-4337 Smart Account is seamlessly deployed for them (using infrastructure like Biconomy or ZeroDev) on the Avalanche C-Chain.
- **Gas Sponsoring:** The platform's Paymaster sponsors initial transaction fees, removing the need for users to hold AVAX. Alternatively, users can pay gas in the Naira-pegged stablecoin they deposit.
- **Group Management:** Users create or join an "Ajoo" rotational savings group. Non-critical off-chain metadata (group name, chat, member order) is stored in the **Supabase PostgreSQL database**.

## 2. Depositing Funds & Cross-Chain Interoperability
- **Native Deposits:** Users deposit the agreed stablecoin contribution into the `AjooGroup.sol` smart contract on the Avalanche C-Chain.
- **Cross-Chain Deposits:** Users with assets on BSC or Polygon can deposit directly. **Avalanche Teleporter** (built on Avalanche Warp Messaging) trustlessly routes the asset to the Avalanche vault via smart contract-to-contract calls, bypassing centralized bridge vulnerabilities.

## 3. Yield Generation (DeFi Routing)
- Once pooled, the smart contract does not let funds sit idle.
- It automatically supplies the pooled stablecoins into an Avalanche DeFi lending protocol (**Aave** or **Benqi**) to generate "Remittance Interest" throughout the cycle.

## 4. Automated Payouts & Automation (Chainlink)
- **Monitoring:** A **Chainlink Keeper** (Automation) actively monitors the `AjooGroup.sol` contract to check if the "Remittance Day" conditions are met (duration elapsed and all members contributed).
- **Execution:** When conditions are met, the Keeper triggers the payout function:
  1. The contract withdraws the principal and accrued interest from Aave.
  2. The next cycle's contribution (and a small platform fee) is automatically deducted from the payout to ensure continuity.
  3. The remaining principal is sent to the current recipient ("First on List").
  4. The accrued interest is distributed among *all* group members.
  5. The auto-deducted contribution is supplied back into Aave to kickstart the next cycle.
- **Utility Integrations:** Chainlink Price Feeds evaluate the stablecoin-to-Naira rate to trigger off-chain utility APIs (Airtime, Data, Bills) if the user opted for direct utility payouts.

## 5. Off-Chain Sync & Notifications (Supabase)
- **Event Listening:** An RPC provider (like Alchemy) listens for `DepositMade` and `PayoutDistributed` events emitted by the Avalanche smart contract.
- **Webhook Integration:** Upon detecting an event, Alchemy triggers a **Supabase Edge Function** webhook.
- **Database Updates:** The Edge Function updates the PostgreSQL database (e.g., updating contribution status, marking a cycle as complete, updating the next recipient).
- **Real-Time Experience:** Supabase pushes real-time notifications to the frontend dashboard, alerting users of successful contributions, upcoming deadlines, remittance days, and off-chain triggers like automated birthday greetings.
