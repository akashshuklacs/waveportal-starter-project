import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import abi from "./utils/WavePortal.json";

const App = () => {/*
    * Just a state variable we use to store our user's public wallet.
    */
    const [currentAccount, setCurrentAccount] = useState("");

    const contractAddress ="0x296DA2D3C9C6DEDC4ae6B0000E33EC36e7146897"
    const contractABI = abi.abi;

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

    const wave = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                const waveTxn = await wavePortalContract.wave();
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
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

                <button className="waveButton" onClick={wave}>
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
