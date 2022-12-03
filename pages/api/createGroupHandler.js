import { createGroupHandler } from "../../app/handler";

export default async function handler(req, res) {
    const reqBody = req.body;
    const responseJSON = await createGroupHandler(reqBody.userAddress, reqBody.groupName, reqBody.members, reqBody.fileCID);
    res.status(200).json(responseJSON);
}