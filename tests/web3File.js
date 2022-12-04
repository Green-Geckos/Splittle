import {putDataOnWeb3Storage, getDataFromWeb3Storage, getLatestfileCID} from '../app/fileServer.js';


console.log(await putDataOnWeb3Storage());
const res = await getDataFromWeb3Storage()
console.log(JSON.stringify(await res.json()));
console.log(getLatestfileCID());