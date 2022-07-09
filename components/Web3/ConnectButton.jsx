import { network } from "@utils/constants"
import Link from "next/link"
import { useMoralis } from "react-moralis"
import { ConnectButton } from "web3uikit"



export default function ConnectButtonWeb3() {
    const {user} = useMoralis()
    return (
        <>
            {user && user.get("ethAddress") && (
            <Link href="/setup">
                <a>
                    Setup
                </a>
            </Link>
            )}
            <ConnectButton
                chainId={network.chainId}
                signingMessage={`I will sign this automatic generated ID to prove that i am the owner of this wallet.`}
            />
        </>
    )
}