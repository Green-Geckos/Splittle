import { settleHandler } from "../../app/handler";


export default async function handler(req, res) {
    const reqBody = req.body;
    await settleHandler(reqBody.from, reqBody.to, reqBody.amount, reqBody.groupId);
    res.status(200).json();
}