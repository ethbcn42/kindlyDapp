import { child, network } from '@utils/constants';
import { useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis';
import { toast } from 'react-toastify';
const useContract = ({ signer, address }) => {
        const {contract} = network;
        const initialState = {
            contract: null,
            errors: []
        }
        const { Moralis, user } = useMoralis()
        const [state, setState] = useState(initialState)
        const ethers = Moralis.web3Library
        
        async function instantiateContract() {
            try {
                const chain = await signer.getChainId()
                const chainId = `0x${chain.toString(16)}`;
                if (chainId !== network.chainId) throw {
                    error: "Please Connect to Goerli Network."
                }
                const smartContract = new ethers.Contract(address, child.abi, signer);
                setState({ ...state, contract: smartContract })
            } catch (error) {
                console.error(error);
                setState({ contract: null, errors: [...state.errors, error.error]})
                toast(error.error, {
                    type: "error"
                })
            }
        }
        
        useEffect(() => {
            if (user && signer && !state.contract) instantiateContract();
            return () => {
                setState(initialState)
            }
        }, [user, signer]);
        

        return {
            ...state,
            instantiateContract
        }
}

export default useContract