import { addExpenseHandler } from "../../app/handler";

export default function handler(req, res) {
    const reqBody = req.body;
    addExpenseHandler(reqBody.from, reqBody.to, reqBody.amount, reqBody.groupId);
    res.status(200).json();
}