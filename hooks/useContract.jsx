import { network } from '@utils/constants';
import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import { toast } from 'react-toastify';
const useContract = ({ signer }) => {
        const {contract} = network;
        const initialState = {
            contract: null,
            errors: []
        }
    
        const { Moralis, user } = useMoralis()
        const [state, setState] = useState(initialState)
        const ethers = Moralis.web3Library
        useEffect(() => {
            async function instantiateContract() {
                try {
                    const chain = await signer.getChainId()
                    const chainId = `0x${chain.toString(16)}`;
                    console.log("currentChainId:", chainId, "contractChainId: ", network.chainId);
                    if (chainId !== network.chainId) throw { error: "Wrong ChainId" }
                    const smartContract = new ethers.Contract(contract.addy, contract.abi, signer);
                    setState({...state, contract: smartContract})
                } catch (error) {
                    console.error(error);
                    setState({ contract: null, errors: [...state.errors, error.error]})
                    toast(error.error, {
                        type: "error"
                    })
                }
            }
            if (user && signer && !state.contract) instantiateContract();
            return () => {
                setState(initialState)
            }
        }, [user, signer]);
    
        return {
            ...state,
        }
}

export default useContract