import { addUserHandler } from "../../app/handler";

export default function handler(req, res) {
    const reqBody = req.body; 
    addUserHandler(reqBody.userAddress, reqBody.username, reqBody.ens);
    res.status(200).json();
}