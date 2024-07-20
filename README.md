Smart-Contract-Management
Donate to a Charity Funding Center!
This project demonstrates a decentralized application (DApp) for charity donations using Ethereum blockchain technology. It includes a Solidity smart contract for managing donations and a React-based frontend for interacting with the contract.

Description
The project consists of two main components:

Smart Contract (Tollgate.sol)
The Solidity smart contract Assessment.sol manages the following functionalities:

defineGoal: Allows the contract owner to set a fundraising goal.
contribute: Enables users to contribute Ether to the charity campaign.
extractFunds: Allows the contract owner to withdraw collected funds after the campaign ends.
Frontend (index.js)
The frontend is a React application (index.js) that interacts with the smart contract through Web3.js. It provides the following features:

Connect to MetaMask: Allows users to connect their MetaMask wallet.
View Account Information: Displays the user's Ethereum account and total contributions.
Contribute: Enables users to contribute to the charity campaign.
Extract Funds: Allows the contract owner to withdraw funds collected.
Getting Started
To get started with this project, follow these steps:

Prerequisites
Node.js: Ensure Node.js is installed on your machine. Make sure it is the correct version of Node.js.
MetaMask: Install the MetaMask extension in your browser.

Installation

Clone the starter repository:
git clone https://github.com/MetacrafterChris/SCM-Starter.git
cd your-repository

Install dependencies:
npm i
Update dependencies:
npm outdated & npm update

Fix vulnerabilities:
npm audit fix

Open two additional terminals in your VS Code.

In the second terminal, start a local blockchain:
"npx hardhat node"

In the third terminal, deploy the contract:
"npx hardhat run --network localhost scripts/deploy.js"

Back in the first terminal, launch the front-end:
"npm run dev"

After this, the project will be running on your localhost, typically at http://localhost:3000/.

Interact with the Contract
Once deployed, interact with the contract by:

Connect Wallet: Connect your MetaMask wallet to the application.
View Account Information: Displays your Ethereum account and current balance.
Contribute: Use the contribute function to donate Ether to the charity campaign.
Extract Funds: If you are the contract owner, use the extractFunds function to withdraw collected funds.
Set Goal: If you are the contract owner, use the defineGoal function to set a fundraising goal.

Authors
Raymark

License
This project is licensed under the VincyDaniel License - see the LICENSE.md file for details.
