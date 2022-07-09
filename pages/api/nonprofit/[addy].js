// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import nonProfits from "@/public/static/nonProfits.json";

export default function handler(req, res) {
    const { query } = req;
    const { addy } = query;
    const leafNodes = nonProfits.map(({address}) => keccak256(address));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const merkleSeed = merkleTree.getRoot();
    const hexProof =  merkleTree.getHexProof(keccak256(addy));
    return res.status(200).json({
        address: addy,
        isVerified: merkleTree.verify(hexProof, keccak256(addy), merkleSeed),
        merkleSeed: merkleSeed.toString("hex"),
        merkleProof: hexProof
    });
}