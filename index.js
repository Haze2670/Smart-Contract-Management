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
  const [donationMessage, setDonationMessage] = useState("");

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

  const contribute = async () => {
    if (!amountInput || isNaN(amountInput)) {
      alert("Please enter a valid amount");
      return;
    }
  
    const amount = ethers.utils.parseEther(amountInput);
    try {
      const tx = await atm.contribute(amount);
      await tx.wait();
      setPopupMessage(`Successfully contributed ${amountInput} ETH`);
      setDonationMessage(`You have successfully donated ${amountInput} ETH to the charity`);
      setBalance(prevBalance => prevBalance + parseFloat(amountInput));
      setAmountInput("");
    } catch (error) {
      console.error("Contribution error:", error);
    }
  };
  
  const extractChange = async () => {
    if (!amountInput || isNaN(amountInput)) {
      alert("Please enter a valid amount");
      return;
    }
  
    const amount = ethers.utils.parseEther(amountInput);
    try {
      const tx = await atm.extractChange(amount);
      await tx.wait();
      setPopupMessage(`Successfully extracted ${amountInput} ETH`);
      setBalance(prevBalance => prevBalance - parseFloat(amountInput));
      setAmountInput("");
    } catch (error) {
      console.error("Extract Change error:", error);
    }
  };
  
  const handleInputChange = (event) => {
    setAmountInput(event.target.value);
  };

  const handleClosePopup = () => {
    setPopupMessage("");
  };

  const handleCloseDonationMessage = () => {
    setDonationMessage("");
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
        <p style={{ color: "white" }}>Your Balance: {balance} ETH</p>
        <input
          type="text"
          value={amountInput}
          onChange={handleInputChange}
          placeholder="Enter amount in ETH"
          style={{ marginBottom: "10px" }}
        />
        <button onClick={contribute} style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}>Contribute</button>
        <button onClick={extractChange} style={{ backgroundColor: "blue", color: "white" }}>Extract Change</button>
        {popupMessage && (
          <div className="popup">
            <p style={{ color: "green", fontWeight: "bold" }}>{popupMessage}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        )}
        {donationMessage && (
          <div className="donation-popup">
            <p style={{ color: "white", fontWeight: "bold" }}>{donationMessage}</p>
            <button onClick={handleCloseDonationMessage}>Close</button>
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
        <h1 style={{ color: "white" }}>Donate to a Charity Funding Center!</h1>
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

        .popup, .donation-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: black;
          padding: 20px;
          border: 1px solid #ccc;
        }

        .popup p, .donation-popup p {
          color: white;
        }

        .donation-popup {
          top: 20px;
          left: 20px;
          transform: translate(0, 0);
        }
      `}</style>
    </main>
  );
}
