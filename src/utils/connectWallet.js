import Web3 from 'web3';
import { connectToGanache, connectToSepolia }  from './walletAdapter'

export const connectWallet = async (role) => {
  try {
    await connectToSepolia();
    const currentProvider = detectCurrentProvider();
    if (currentProvider) {
      await currentProvider.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const account = userAccount[0];
      localStorage.setItem('walletAddress', account); // Store wallet address in local storage
      console.log(`Connected wallet: ${account}, Role: ${role}`);
      return account;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    console.log("Non-ethereum browser detected. You should install Metamask");
  }
  return provider;
};

export const getBalance = async (account) => {
    try {
        await connectToSepolia();
        const currentProvider = detectCurrentProvider();
        if (currentProvider) {
          const web3 = new Web3(currentProvider);
          const balance = await web3.eth.getBalance(account);
          return balance;
        }
      } catch (err) {
        console.log(err);
      }
  };
