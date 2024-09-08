import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '../components/ui/button'
import { payToMint2, getBalance, getCount, getAllNFTs, mintNFT, safeMintNFT } from '../contract/methods'
import useWallet from '@/hooks/useWallet';

function Firepage() {
    const { address, signer } = useWallet(); 

    const [balance, setBalance] = useState();
    
    // const getBalance = async () => {
    //     const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const balance = await provider.getBalance(account);
    //     setBalance(ethers.utils.formatEther(balance));
    // };

    const mintNFT2 = async () => {
        const aakash = '0x260192b1B8b4ecDeF2EeC2C02Bd9Ae15011464a5';
        const meta = 'QmZA6dUoe6CDAbhnxBWJVo79GqscPFxYrbCf3YaVNvDwxv';
        await mintNFT('0x7EC8e6614A2E3A1E4d6e321376a608666C8B6f8d', '0x7EC8e6614A2E3A1E4d6e321376a608666C8B6f8d', meta);
    }
    const safeMint2 = async () => {
        const aakash = '0x260192b1B8b4ecDeF2EeC2C02Bd9Ae15011464a5';
        const meta = 'QmZA6dUoe6CDAbhnxBWJVo79GqscPFxYrbCf3YaVNvDwxv';
        await safeMintNFT(address, aakash, meta);
    }
    const paytomint = async () => {
        const aakash = '0x260192b1B8b4ecDeF2EeC2C02Bd9Ae15011464a5';
        const aayushi = '0x91d564EBceC4Fb617e77D1d11b3Af77f13336309';
        const meta = 'QmSxWzVwpTsQEDy8KxGXLbJhTf9W81irnaNbgXM4E1TDCp';
        await payToMint2(signer, aakash, meta);
    }

    const getBalance2 = async () => {
      const address = signer.getAddress();
      console.log(address);
      const balance = await getBalance(signer);
      console.log(balance);
    }

    const getBalance3 = async () => {
      const balance = await getCount(address);
      console.log(balance);
    }

  
    return (
      <div>
          <h5>Your Balance: {balance}</h5>
          <button onClick={getBalance2}>Show My Balance</button>
          <Button onClick={getBalance3}>get coint</Button>
          <Button onClick={() => getAllNFTs(address)}>get NFTs</Button>
          <Button onClick={mintNFT2}>Mint NFT</Button>
          <Button onClick={paytomint}>pay to mint</Button>
          <Button onClick={safeMint2}>safe mint</Button>
      </div>
    );
  };
  
  export default Firepage;