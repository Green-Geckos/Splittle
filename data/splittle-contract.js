import { ethers } from "ethers";

// remind
function call_remind_function(conn, address, amount){
    // TODO
    conn.remind(address, amount);
}

// set storage identifier
function set_storage_identifier(conn, ipfs_hash){
    // TODO
    conn.setStorageIdentifier(ipfs_hash);
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

//get identifier
async function getStorageIdentifier(conn){
    const identifier = await conn.getStorageIdentifier();
    return identifier;
}
