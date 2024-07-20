import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [amountInput, setAmountInput] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [payTollEnabled, setPayTollEnabled] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true); 

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
        setBalance(contractBalance.toNumber() / 10**18);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const payToll = async () => {
    if (!amountInput || isNaN(amountInput)) {
      alert("Please enter a valid amount");
      return;
    }
  
    const amount = ethers.utils.parseEther(amountInput);
    try {
      const tx = await atm.payToll(amount);
      await tx.wait();
      setPopupMessage(`You have successfully paid ${amountInput} ETH`);
      setAmountInput("");
      setPayTollEnabled(false);
      setBalance(0);
    } catch (error) {
      if (error.message.includes("You need to set ETH balance first")) {
        setPopupMessage("You need to set ETH balance first");
      } else {
        console.error("Pay Toll error:", error);
      }
    }
  };
  
  const inputBalance = async () => {
    if (!amountInput || isNaN(amountInput)) {
      alert("Please enter a valid amount");
      return;
    }
  
    const amount = ethers.utils.parseEther(amountInput);
    try {
      const tx = await atm.inputBalance(amount);
      await tx.wait();
      setPopupMessage(`Successfully updated balance to ${amountInput} ETH`);
      setBalance(parseFloat(amountInput));
      setPayTollEnabled(true);
      setAmountInput("");
    } catch (error) {
      console.error("Input Balance error:", error);
    }
  };
  
  const handleInputChange = (event) => {
    setAmountInput(event.target.value);
  };

  const handleClosePopup = () => {
    setPopupMessage("");
  };

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p style={{ color: "white" }}>
          Your Balance: {balanceVisible ? `${balance} ETH` : "*"}
        </p>
        <button onClick={toggleBalanceVisibility} style={{ backgroundColor: "green", color: "white", marginBottom: "10px" }}>
          {balanceVisible ? "Hide Balance" : "Show Balance"}
        </button>
        <input
          type="text"
          value={amountInput}
          onChange={handleInputChange}
          placeholder="Enter amount in ETH"
          style={{ marginBottom: "10px" }}
        />
        <button 
          onClick={payToll} 
          style={{ backgroundColor: "green", color: "white", marginRight: "10px" }}
          disabled={!payTollEnabled}
        >
          Pay Toll
        </button>
        <button onClick={inputBalance} style={{ backgroundColor: "green", color: "white" }}>Input Balance</button>
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
        <h1 style={{ color: "white" }}>Pay Tollgate</h1>
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
