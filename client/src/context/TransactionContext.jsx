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

        //getAllTransactions()
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
    } catch (error) {
      throw new Error("Sorry, the network was unable to send that transaction right now. Please try again");
    }
  };

  useEffect(() => {
    checkWalletConnect();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
