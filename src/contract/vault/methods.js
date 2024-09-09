import { Web3 } from 'web3';
import { providerUrl, abi, contractAddress } from './constants'
import { ethers } from 'ethers';

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

export async function myAddressMethod(address) {
    try {
    const result = await contract.methods.myAddress()
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
      const result = await contract.methods.getUserName(userAddress).call({ from: address , gas : 3000000});
      if (result == "") {
          return null;
      }
      return result;
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function getVerificationRequestsMethod(address) {
    try {
      const result = await contract.methods.getVerificationRequests().call({ from: address , gas : 2000000});

      return result;
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}


export async function getNewDocumentRequestsMethod(address) {
    try {
      const result = await contract.methods.getNewDocumentRequests().call({ from: address , gas : 2000000});

      return result;
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function addVerificationRequestMethod(address, orgAddress, id, ipsfHash, title, description, metadata, docType) {
    try {
      const result = await contract.methods.addVerificationRequest(orgAddress, id, ipsfHash, title, description, metadata, docType).send({ from: address , gas : 2000000});

      console.log(result);
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function addNewDocumentRequestMethod(address, orgAddress, id, title, description, metadata, docType) {
    try {
      const result = await contract.methods.addNewDocumentRequest(orgAddress, id, title, description, metadata, docType).send({ from: address , gas : 2000000});

      console.log(result);
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function getUserOrganizationsMethod(address) {
    try {
      const result = await contract.methods.getUserOrganizations().call({ from: address , gas : 4000000});
        
        
        return result;
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function deleteVerificationRequestMethod(address, id) {
    try {
      const result = await contract.methods.deleteVerificationRequest(id).send({ from: address , gas : 4000000});
      console.log(result);
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export async function deleteNewDocumentRequestMethod(address, id) {
    try {
      const result = await contract.methods.deleteNewDocumentRequest(id).send({ from: address , gas : 4000000});
      console.log(result);
    
    } catch(error) {
        console.error(" there was an error", error);
    }
}

export const getitbro = async (signer) => {
    try {
      const newContract = new ethers.Contract(contractAddress, abi, signer);
    //   const result = await contract.methods.registerUser(name)
    //   .send({ from: address , gas : 2000000});
    //   console.log('user registered: ', result);
    
      const tx = await newContract.registerUser('Harshit Rai Verma 2');
      
      await tx.wait();
      console.log("Minting successful. Transaction hash:", tx.hash);
    } catch (error) {
      console.error("Minting failed:", error);
    }
};