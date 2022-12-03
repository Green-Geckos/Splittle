import { createGroupHandler } from "../../app/handler";

export default async function handler(req, res) {
    const reqBody = req.body;
    const responseJSON = await createGroupHandler(reqBody.groupName, reqBody.userAddress, reqBody.members);
    res.status(200).json(responseJSON);
}