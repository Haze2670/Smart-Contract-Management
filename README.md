Smart-Contract-Management
Pay Tollgate

This project demonstrates a decentralized application (DApp) for managing payments using Ethereum blockchain technology. It includes a Solidity smart contract for handling toll payments and a React-based frontend for interacting with the contract.

Description
The project consists of two main components:

Smart Contract (Tollgate.sol)
The Solidity smart contract Tollgate.sol manages the following functionalities:

setGoal: Allows the contract owner to set a toll payment goal.
inputBalance: Enables the user to enter an ETH amount, which sets the balance to zero and updates it when displayed.
payToll: Allows users to make payments through MetaMask. This function can only be called after inputBalance has been executed.
Frontend (index.js)
The frontend is a React application (index.js) that interacts with the smart contract through Web3.js. It provides the following features:

Connect to MetaMask: Allows users to connect their MetaMask wallet.
View Account Information: Displays the user's Ethereum account and current balance.
Set Goal: Enables the contract owner to set a toll payment goal.
Enter Balance: Allows users to input and display the ETH balance.
Pay Toll: Enables users to make payments to the tollgate.

Getting Started
To get started with this project, follow these steps:

Prerequisites

Node.js: Ensure Node.js is installed on your machine. Make sure it is the correct version of Node.js.
MetaMask: Install the MetaMask extension in your browser.
Installation

Clone the starter repository:
git clone https://github.com/YourGitHubUsername/Tollgate-Starter.git
cd your-repository
Install dependencies:

npm i
Update dependencies:

npm outdated & npm update
Fix vulnerabilities:

npm audit fix
Open two additional terminals in your VS Code.

In the second terminal, start a local blockchain:

npx hardhat node
In the third terminal, deploy the contract:

npx hardhat run --network localhost scripts/deploy.js
Back in the first terminal, launch the front-end:

npm run dev
After this, the project will be running on your localhost, typically at http://localhost:3000/.

Interact with the Contract
Once deployed, interact with the contract by:

Connect Wallet: Connect your MetaMask wallet to the application.
View Account Information: Displays your Ethereum account and current balance.
Set Goal: Use the setGoal function to set a toll payment goal.
Enter Balance: Input and display the ETH balance using the enterBalance function.
Pay Toll: Make payments to the tollgate using the payToll function.

Authors
Raymark

License
This project is licensed under the VincyDaniel License - see the LICENSE.md file for details.
