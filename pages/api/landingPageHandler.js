import { landingPageHandler } from "../../app/handler";

export default async function handler(req, res) {
    const reqBody = req.body;
    const responseJSON = await landingPageHandler(reqBody.userAddress, reqBody.fileCID);
    console.log(responseJSON);
    res.status(200).json(responseJSON);
}