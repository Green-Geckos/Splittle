import { addUserHandler } from "../../app/handler";

export default async function handler(req, res) {
    const reqBody = req.body; 
    await addUserHandler(reqBody.userAddress, reqBody.username, reqBody.ens, reqBody.fileCID);
    res.status(200).json();
}