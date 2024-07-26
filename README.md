Tollgate Payment Online

This project is a decentralized application (dApp) allowing users to interact with a Tollgate smart contract. Users can input an ETH balance, pay a toll, and manage their balance. The application is connected to the Ethereum blockchain via MetaMask.

Key Components
Smart Contract
State Variables
owner: The address of the contract deployer and owner.
balance: The current balance available for toll payments.
balanceSet: A boolean indicating if the balance has been set.
Events
Payment: Emitted when a user successfully pays the toll, with details of the account and amount.
BalanceUpdated: Emitted when the contract's balance is updated.
Constructor
Initializes the owner to the contract deployer (msg.sender) and sets the balance to 0.
Functions
getBalance(): Returns the current balance of the contract.
payToll(uint256 _amount): Allows users to pay a toll. Checks that the balance is set and sufficient funds are available.
inputBalance(uint256 _newBalance): Allows the owner to set the balance.
resetBalance(): Allows the owner to reset the balance to 0.
Frontend Application
The frontend is built using React and communicates with the smart contract via ethers.js.

Features
Connect Wallet: Users can connect their MetaMask wallet to interact with the application.
View Balance: Users can view the current balance (hidden by default for security).
Input Balance: The contract owner can set the balance.
Pay Toll: Users can pay a toll using the balance.
Popup Notifications: Inform users of successful transactions or errors.
How to Run the Program
Prerequisites
Node.js: Make sure you have Node.js installed.
MetaMask: Users need MetaMask installed in their browser.

Installation
Clone the repository:
Copy code
git clone <repository-url>
cd <project-directory>
Install dependencies:

Copy code
npm install
Smart Contract Deployment
Open a terminal and start a local Ethereum network:

Copy code
npx hardhat node
In another terminal, deploy the smart contract:

Copy code
npx hardhat run --network localhost scripts/deploy.js
Frontend
Start the frontend application:

Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.
Usage
Connect your MetaMask wallet.
If you're the contract owner, set the balance using the "Input Balance" feature.
Pay the toll using the "Pay Toll" feature, ensuring the balance is sufficient.
Example Smart Contract Code
solidity


// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Tollgate {
    address payable public owner;
    uint256 public balance = 0;
    bool public balanceSet = false;

    event Payment(address indexed account, uint256 amount);
    event BalanceUpdated(address indexed account, uint256 newBalance);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function payToll(uint256 _amount) public payable {
        require(balanceSet, "You need to set ETH balance first");
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= balance, "Insufficient balance");
        
        balance -= _amount;
        emit Payment(msg.sender, _amount);

        if (balance <= 0) {
            balance = 0;
            balanceSet = false;
        }
    }

    function inputBalance(uint256 _newBalance) public {
        require(msg.sender == owner, "You are not the owner of this account");
        
        balance = _newBalance;
        balanceSet = true;
        emit BalanceUpdated(msg.sender, _newBalance);
    }

    function resetBalance() public {
        require(msg.sender == owner, "You are not the owner of this account");
        balance = 0;
        balanceSet = false;
    }
}


How to Run the Program

Inside the project directory, in the terminal type: npm i
Open two additional terminals in your VS code
In the second terminal type: npx hardhat node
In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
Back in the first terminal, type npm run dev to launch the front-end.
After this, the project will be running on your localhost. Typically at http://localhost:3000/
