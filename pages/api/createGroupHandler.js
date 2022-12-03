import { createGroupHandler } from "../../app/handler";

export default function handler(req, res) {
    const reqBody = req.body;
    const responseJSON = createGroupHandler(reqBody.groupName, reqBody.userAddress);
    res.status(200).json(responseJSON);
}