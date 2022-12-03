// settle

import { ethers } from "ethers";
import abi from "../abi/contracts-abi.json";

const address = "0x7FEFe32cC7abDed3b38e08F9406F3ab41A844123";


const provider = ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const splittle_contract = new ethers.Contract(
    addressOrName= address,
    contractInterface=abi,
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
