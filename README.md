# Smart-Contract-Management

Metamask ETH Bank!
This Solidity smart contract basically shows how a user can connect his/her metamask wallet to a front end and shows how his/her account information can be retrieved and shown on the front-end

Description
This Solidity smart contract simply simulates a scenario where a user will be able to connect his/her metamask wallet account to a front-end and shows his/her account number as well as the balance of the said account

Getting Started
Executing program

To run this program, you can use gitpod, an online Solidity IDE. To get started, go to the Gitpod website https://metacrafterc-scmstarter-m0r8y82q8c8.ws-us105.gitpod.io

Once you are on the Gitpod website, create a new file by clicking on the "≡" icon in the left-hand sidebar and clicking on new file. Save the file with a .sol extension (e.g., ErrorHandling.sol). Copy and paste the following code into the file:

Assessment.sol

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance = 1000 ether;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner, "You are not the owner of this account");
        
        balance += _amount;
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_withdrawAmount <= balance, "Insufficient balance");

        balance -= _withdrawAmount;
        emit Withdraw(msg.sender, _withdrawAmount);
    }
}


index.js

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(1000); 
  const [amountInput, setAmountInput] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    try {
      if (atm) {
        const contractBalance = await atm.getBalance();
        setBalance(contractBalance.toNumber() / 10**18); // Convert from wei to ETH
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const deposit = async () => {
    if (!amountInput || isNaN(amountInput)) {
      alert("Please enter a valid amount");
      return;
    }
  
    const amount = ethers.utils.parseEther(amountInput);
    try {
      const tx = await atm.deposit(amount);
      await tx.wait();
      setPopupMessage(`Successfully deposited ${amountInput} ETH`);
      setBalance(prevBalance => prevBalance + parseFloat(amountInput));
      setAmountInput("");
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };
  
  const withdraw = async () => {
    if (!amountInput || isNaN(amountInput)) {
      alert("Please enter a valid amount");
      return;
    }
  
    const amount = ethers.utils.parseEther(amountInput);
    try {
      const tx = await atm.withdraw(amount);
      await tx.wait();
      setPopupMessage(`Successfully withdrew ${amountInput} ETH`);
      setBalance(prevBalance => prevBalance - parseFloat(amountInput));
      setAmountInput("");
    } catch (error) {
      console.error("Withdraw error:", error);
    }
  };
  
  const handleInputChange = (event) => {
    setAmountInput(event.target.value);
  };

  const handleClosePopup = () => {
    setPopupMessage("");
  };

  const initUser = () => {
    // check if you have metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if you are connected
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p style={{ color: "white" }}>Your Balance: {balance} ETH</p>
        <input
          type="text"
          value={amountInput}
          onChange={handleInputChange}
          placeholder="Enter amount in ETH"
          style={{ marginBottom: "10px" }}
        />
        <button onClick={deposit} style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}>Deposit</button>
        <button onClick={withdraw} style={{ backgroundColor: "blue", color: "white" }}>Withdraw</button>
        {popupMessage && (
          <div className="popup">
            <p style={{ color: "green", fontWeight: "bold" }}>{popupMessage}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1 style={{ color: "white" }}>Welcome to Your ETH Bank!</h1>
      </header>
      {initUser()}
      <style jsx global>{`
        body {
          background-color: black;
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .container {
          text-align: center;
        }

        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: black;
          padding: 20px;
          border: 1px solid #ccc;
        }

        .popup p {
          color: white;
        }
      `}</style>
    </main>
  );
}

To get the code and the front-end working, follow these steps:

Inside the project directory, in the terminal type: npm i
Open two additional terminals in your VS code
In the second terminal type: npx hardhat node
In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
Back in the first terminal, type npm run dev to launch the front-end.

Author
Raymark
