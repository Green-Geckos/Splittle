// settle

import { ethers } from "ethers";
import abi from "../abi/contracts-abi.json";

const address = process.env.CONTRACT_ADDRESS;


const provider = ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

console.log(`address is ${address}`);

const splittle_contract = new ethers.Contract(
    address=address,
    abi=abi,
    signerOrProvider=signer
)

const connection = splittle_contract.connect(signer)

// remind
function call_remind_function(address, amount){
    // TODO
    connection.remind(address, amount);
}

// set storage identifier
function set_storage_identifier(ipfs_hash){
    // TODO
    connection.setStorageIdentifier(ipfs_hash);
}

// approve
// direct transfer. 
// call backend to spread the word
async function approve(to, value){
    // ethers.js send transaction
    const response = await signer.sendTransation({
        to: to,
        value: value
    });
    return response;
}

//get identifier
async function getStorageIdentifier(){
    const identifier = await connection.getStorageIdentifier();
    return identifier;
}
