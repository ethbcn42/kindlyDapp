import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import useContract from './useRegistryContract.jsx';

const useConfigSplitter = ({signer}) => {
    const initialState = {
        currentConfig: {
            ong: undefined,
            wallet: undefined,
            percentage: undefined
        }
    }
    const { user } = useMoralis()
    const {contract: kindly} = useContract({ signer })
    const [state, setState] = useState(initialState)
    useEffect(() => {
        async function checkIsAlreadyRegistered() {
            const registrationAddress = await kindly.Registry(user.get("ethAddress"));
            console.log("registrationAddress: ", registrationAddress)
            setState({ 
                ...state,
                isRegistered: registrationAddress !== "0x0000000000000000000000000000000000000000",
                registrationAddress
            })
        }

        if (user && kindly) checkIsAlreadyRegistered();
    }, [user, kindly]);

    return {
        ...state,
    }
}

export default useConfigSplitter