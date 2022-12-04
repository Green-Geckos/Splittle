import { getLatestfileCID } from "../../app/fileServer";

export default async function handler(req, res) {
    const fileCID = getLatestfileCID();
    res.status(200).json({ fileCID });
}