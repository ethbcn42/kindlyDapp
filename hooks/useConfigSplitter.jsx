import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import useContract from './useChildContract.jsx';

const useConfigSplitter = ({signer, address}) => {
    const initialState = {
        currentConfig: {
            ong: undefined,
            wallet: undefined,
            percentage: undefined
        }
    }
    const { user } = useMoralis()
    const {contract: splitter} = useContract({ signer, address })
    const [state, setState] = useState(initialState)
    useEffect(() => {
        async function fetchData() {
            const ong = await splitter.ong();
            const wallet = await splitter.wallet();
            const percentage = (await splitter.percent()).toNumber();
            const currentConfig = {
                ong,
                wallet,
                percentage
            }

            console.log("currentConfig: ", currentConfig)
            setState({ 
                ...state,
                currentConfig
            })
        }

        if (user && splitter) fetchData();
    }, [user, splitter]);

    return {
        ...state,
        splitter,
    }
}

export default useConfigSplitter