import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import SetupForm from '@components/SetupForm';
import useCheckAlreadyRegistered from '@hooks/useCheckAlreadyRegistered';
import useContract from '@hooks/useRegistryContract';
import useChildContract from '@hooks/useConfigSplitter';

import MainLayout from '@layouts/MainLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { child } from '@utils/constants';
import UpdateSplitter from '@components/UpdateSplitter';
import CreateSplitter from '@components/CreateSplitter';

const setup = () => {
    const { user, isAuthenticated, isWeb3Enabled, web3, enableWeb3 } = useMoralis()
    const router = useRouter()
    const [signer, setSigner] = useState(null)

    useEffect(() => {
        if (!isWeb3Enabled) {
            enableWeb3();
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        if (web3) {
            const web3Signer = web3.getSigner();
            setSigner(web3Signer);
        }
        return () => setSigner(null);
    }, [web3]);

    //const { contract: kindly } = useContract({ signer })

    useEffect(() => {
        if (isAuthenticated === false) router.replace("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);
    const { registrationAddress, isRegistered } = useCheckAlreadyRegistered({ signer })

    if (isRegistered === false) {
        return <CreateSplitter signer={signer}/>
    }

    if (isRegistered === true) {
        return <UpdateSplitter signer={signer} registrationAddress={registrationAddress} />
    }
}

export default setup