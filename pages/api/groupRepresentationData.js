import { groupRepresentationData } from "../../app/handler";

export default function handler(req, res) {
    const reqBody = req.body;
    const responseJSON = groupRepresentationData(reqBody.groupId, reqBody.userAddress);
    res.status(200).json(responseJSON);
}