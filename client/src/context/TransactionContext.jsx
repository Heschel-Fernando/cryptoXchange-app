import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkWalletConnect = async () => {
    try {
      if (!ethereum) {
        return "Please install Metamask";
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts", accounts);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return "Please install Metamask";

      const account = ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(account[0]);

      window.location.reload();
    } catch (error) {
      throw new Error("Sorry, no Metamask accounts were detected. Please try again");
    }
  };

  const sendTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask first");

      //get the data here
      const { addressTo, amount, keyword, message } = formData;

      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parsedAmount._hex, // given amount
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading ${transactionHash.hash}`);

      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      setTransactionCount(transactionCount.toNumber());

      window.location.reload();
    } catch (error) {
      throw new Error("Sorry, the network was unable to send that transaction right now. Please try again");
    }
  };

  const checkTransactionExists = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("Sorry, we were unable to fetch the latest transaction. Please try again");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return "Please install Metamask";
      const transactionContract = getEthereumContract();

      const availableTransactions = await transactionContract.getAllTransactions();
      console.log(availableTransactions);

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
      }));

      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkWalletConnect();
    checkTransactionExists();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransactions,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
