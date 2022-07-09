import { network } from "@utils/constants"
import { ConnectButton } from "web3uikit"

export default function ConnectButtonWeb3() {
    return (
        <ConnectButton
        chainId={network.chainId}
        signingMessage={`I will sign this automatic generated ID to prove that i am the owner of this wallet.`}
        />
    )
}