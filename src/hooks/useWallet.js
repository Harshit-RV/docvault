import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useWallet = () => {
  const [ address, setAddress ] = useState(null);
  const [ signer, setSigner ] = useState(null);

  const getSigner = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        signer.getAddress().then((address) => {
          setAddress(address);
          localStorage.setItem('walletAddress', address);
          localStorage.setItem('signer', signer);
        });
        setSigner(signer);
      } catch (error) {
        console.error("User denied account access or there is an issue with MetaMask:", error);
      }
    } else {
      console.error("MetaMask not detected. Please install MetaMask.");
    }
  }

  const getAddress = async () => {
    localStorage.getItem('walletAddress') && setAddress(localStorage.getItem('walletAddress'));
  };

  useEffect(() => {
    getSigner();
  });

  return { address, signer };
};

export default useWallet;