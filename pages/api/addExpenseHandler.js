import { addExpenseHandler } from "../../app/handler";

export default async function handler(req, res) {
    const reqBody = req.body;
    await addExpenseHandler(reqBody.from, reqBody.to, reqBody.amount, reqBody.groupId);
    res.status(200).json();
}