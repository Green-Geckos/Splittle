// settle

import { ethers } from "ethers";
import abi from "../abi/contracts-abi.json";

const address = process.env.CONTRACT_ADDRESS;


const provider = ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const splittle_contract = new ethers.Contract(
    address= address,
    abi=abi,
    signerOrProvider=signer
)

const connection = splittle_contract.connect(signer)

// remind
function call_remind_function(){
    // TODO
    connection.remind("", 30);
}

// set storage identifier
function set_storage_identifier(){
    // TODO
    connection.setStorageIdentifier("IPFS_HASH");
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
