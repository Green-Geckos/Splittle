import { addExpenseHandler } from "../../app/handler";

export default async function handler(req, res) {
    const reqBody = req.body;
    await addExpenseHandler(reqBody.paidBy, reqBody.groupId, reqBody.splitDetails, reqBody.amountPaid, reqBody.expenseTitle , reqBody.fileCID);
    res.status(200).json();
}