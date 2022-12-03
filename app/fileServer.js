import fs from 'fs';
const dataLocation = 'data.json';

let fileCID;

export function getJSONData() {
    const data = fs.readFileSync(dataLocation, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData;
}

export function putJSONData(data){
    const stringifiedData = JSON.stringify(data, undefined, 2);
    fs.writeFileSync(dataLocation, stringifiedData);
}

// // Web3 Storage APIs
// import { Web3Storage, getFilesFromPath } from 'web3.storage';
// import fetch from 'node-fetch';

// const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZkNjQ4NGRGZmYzQzJBZDY5RkUwOUMwQzBFRDQ2Qzc2N2Y0QjBjM2YiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNDA5NjI4MTIsIm5hbWUiOiJ3ZWIzIn0.AIl5BTY-a5Ao5VBqx6i1jZ8-iILkOpJ7XUwBtUq4Rk4";

// // Construct with token and endpoint
// const client = new Web3Storage({ token: apiToken });

// export async function putDataOnWeb3Storage() {
//     const dataFiles = await getFilesFromPath(dataLocation);
//     const cid = await client.put(dataFiles);
//     fileCID = cid;
//     return fileCID;
// }

// export async function getDataFromWeb3Storage() {
//     return fetch(`https://${fileCID}.ipfs.w3s.link/data.json`);
// }

