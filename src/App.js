import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {/*
    * Just a state variable we use to store our user's public wallet.
    */
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        }
        else {
            console.log("We have ethereum object", ethereum);
        }
        const accounts = await ethereum.request({ method : "eth_accounts"});

        if (accounts.lentth !==0) {
            const account = accounts[0];
            console.log("Found an authorised account:", account);
            setCurrentAccount(account);
        }
        else {
            console.log("No authorized account found");
        }
        } catch(error) {
        console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
              }

            const accounts = await ethereum.request({ method: "eth_requestAccounts"});

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                👋 Hey there!
                </div>

                <div className="bio">
                    I am Akash and I am a software developer!
                </div>

                <button className="waveButton" onClick={null}>
                    Wave at Me
                </button>

            {!currentAccount && (
                <button className="waveButton" onClick={connectWallet}>
                    Connect Wallet
            </button>
            )}
            </div>
        </div>
        );
    }
export default App
