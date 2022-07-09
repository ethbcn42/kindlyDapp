import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import useContract from './useContract.jsx';

const useCheckAlreadyRegistered = ({signer}) => {
    const initialState = {
        isRegistered: undefined,
        registrationAddress: undefined,
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

export default useCheckAlreadyRegistered