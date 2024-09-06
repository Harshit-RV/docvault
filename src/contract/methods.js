import {Web3} from 'web3';
import { providerUrl, abi, contractAddress } from './constants'

const web3 = new Web3(providerUrl);
const contract = new web3.eth.Contract(abi, contractAddress);

export const testAddress = "0xDcC7a6fa29045AA5dEAdFF21f7a443ca750c918E"

export async function createWorkOrderOg(id, title, description, maxBid, createdAt, deadline, signerAuthority) {
    try {
    const result = await contract.methods.createWorkOrder(id, title, description, maxBid, createdAt, deadline, signerAuthority)
        .send({ from: testAddress , gas : 2000000});
        console.log(result);
    } catch(error) {
        console.error(" there was an error", error);
    }
}

