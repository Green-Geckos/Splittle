import { ethers } from "ethers";
import fs from 'fs';

// remind
function callRemindFunction(conn, address, amount){
    // TODO
    conn.remind(address, amount);
}

// set storage identifier
function setStorageIdentifier(conn, ipfs_hash){
    // TODO
    conn.setStorageIdentifier(ipfs_hash);
}

//get identifier
async function getStorageIdentifier(){
    const abiJSON = JSON.parse(fs.readFileSync('../abi/contract.json', 'utf-8'));
    const identifier = await conn.getStorageIdentifier();
    return identifier;
}

// approve
// direct transfer. 
// call backend to spread the word
async function approve(signer, to, value){
    // ethers.js send transaction
    const response = await signer.sendTransation({
        to: to,
        value: value
    });
    return response;
}