import { landingPageHandler } from "../../app/handler";

export default function handler(req, res) {
    const reqBody = req.body;
    const responseJSON = landingPageHandler(reqBody.userAddress);
    res.status(200).json(responseJSON);
}