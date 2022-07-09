// This mockup api data is taken from FugueFoundation.
import nonProfits from "@/public/static/nonProfits.json";

export default function handler(req, res) {
    return res.status(200).json(nonProfits);
}