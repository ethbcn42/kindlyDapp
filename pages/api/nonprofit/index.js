// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nonProfits from "@/public/static/nonProfits.json";

export default function handler(req, res) {
    return res.status(200).json(nonProfits);
}