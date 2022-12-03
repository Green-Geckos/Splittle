import { getJSONData } from "../app/fileServer.js";
import * as hd from "../app/handler.js";
import fs from 'fs';


fs.writeFileSync('./data.json', JSON.stringify({
    "userDetails": [],
    "groups": [],
    "expenses": []
  }, undefined, 2));



hd.addUserHandler("0x00", "ram", "ram.eth");
hd.addUserHandler("0x01", "shyam", "shyam.eth");
hd.addUserHandler("0x02", "balram", "balram.eth");


hd.createGroupHandler("0x01", "bhai", ["0x00", "0x02"]);

hd.addExpenseHandler({
    "0x00" : 100, 
    "0x01" : 0, 
    "0x02":0
}, 0, {
    "0x00" : 30, 
    "0x01" : 30, 
    "0x02" : 40, 
}, 100, "jungle");


hd.settleHandler("0x02", "0x00", 50, 0);

// console.log(JSON.stringify(getJSONData(), undefined, 2));
// console.log(JSON.stringify(hd.groupRepresentationData(0, "0x00"), undefined, 2));
// console.log(JSON.stringify(hd.groupRepresentationData(0, "0x01"), undefined, 2));
// console.log(JSON.stringify(hd.groupRepresentationData(0, "0x02"), undefined, 2));
// console.log(JSON.stringify(hd.landingPageHandler("0x01"), undefined, 2));

console.log(JSON.stringify(hd.landingPageHandler("0x00"), undefined, 2));