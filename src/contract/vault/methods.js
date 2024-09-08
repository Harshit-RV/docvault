import { Web3 } from 'web3';
import { providerUrl, abi, contractAddress } from './constants'

const web3 = new Web3(providerUrl);
const contract = new web3.eth.Contract(abi, contractAddress);


export async function requestToJoinOrgMethod(address, orgAddress, description) {
    try {
    const result = await contract.methods.requestToJoinOrg(orgAddress, description)
        .send({ from: address , gas : 2000000});
        console.log(result);
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function registerUserMethod(address, name) {
    try {
    const result = await contract.methods.registerUser(name)
        .send({ from: address , gas : 2000000});
        console.log('user registered: ', result);
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function registerOrganisationMethod(address, name) {
    try {
    const result = await contract.methods.registerOrganization(name)
        .send({ from: address , gas : 2000000});
        console.log(result);
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function updateJoinRequestMethod(address, memberAddress, acceptanceStatus, hashedMessage, v, r, s) {
    try {
    const result = await contract.methods.updateJoinRequest(memberAddress, acceptanceStatus, hashedMessage, v, r, s)
        .send({ from: address , gas : 2000000});
        console.log(result);
    } catch(error) {
        console.error(" there was an error", error);
    }
}


export async function getJoinRequestsMethod(address,) {
    try {
    const result = await contract.methods.getJoinRequests()
        .call({ from: address , gas : 2000000});
    return result;
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function getMembersMethod(address,) {
    try {
    const result = await contract.methods.getMembers()
        .call({ from: address , gas : 2000000});
        return result;
    } catch(error) {
        console.error(" there was an error", error);
        return [];
    }
}

export async function getOrgNameMethod(address, orgAddress) {
    try {
        const result = await contract.methods.getOrgName(orgAddress).call({ from: address , gas : 2000000});
        if (result == "") {
            return null;
        }
        return result;
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function getUserNameMethod(address, userAddress) {
    try {
      const result = await contract.methods.getUserName(userAddress).call({ from: address , gas : 2000000});
      if (result == "") {
          return null;
      }
      return result;
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}