const dataLocation = 'data.json';

let fileCID;

export function getJSONData() {
    const data = fs.readFileSync(dataLocation, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData;
}


export function putJSONData(data){
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync(dataLocation, stringifiedData);
}



// Web3 Storage APIs

import { Web3Storage, getFilesFromPath } from 'web3.storage';

const apiToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZkNjQ4NGRGZmYzQzJBZDY5RkUwOUMwQzBFRDQ2Qzc2N2Y0QjBjM2YiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNDA5NjI4MTIsIm5hbWUiOiJ3ZWIzIn0.AIl5BTY-a5Ao5VBqx6i1jZ8-iILkOpJ7XUwBtUq4Rk4;

// Construct with token and endpoint
const client = new Web3Storage({ token: apiToken })

export async function putDataOnWeb3Storage() {
    const dataFiles = await getFilesFromPath(dataLocation);
    const cid = await client.put(dataFiles);
    fileCID = cid;
}

export async function getDataFromWeb3Storage() {
    const res = await client.get(rootCid); // Web3Response

    if(!res){
        throw new Error('No data found on IPFS protocol');
    }

    const files = await res.files(); // Web3File[]
    return files[0];
}

