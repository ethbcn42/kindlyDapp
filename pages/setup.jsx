import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import SetupForm from '@components/SetupForm';
import useContract from '@hooks/useContract';
import MainLayout from '@layouts/MainLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

const setup = () => {
    const { user, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, web3, enableWeb3 } = useMoralis()
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

    const {contract: kindly} = useContract({signer})

    useEffect(() => {
        if (isAuthenticated === false) router.replace("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        if (kindly) {
            console.log({kindly})
        }
    }, [kindly])
    return (
        <MainLayout>
            <Container maxW={'3xl'}>

                <section>
                <Stack
                        as={Box}
                        textAlign={'center'}
                        spacing={{ base: 8, md: 14 }}
                        pt={{ base: 20, md: 20 }}>
                        <Heading
                            fontWeight={600}
                            padding={8}
                            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                            lineHeight={'110%'}>
                            You are 3 minutes away from escaping the tax rabbit hole. <br />
                            <Text as={'span'} color={'#7fb5ff'}>
                                Ready to change the world Alice?
                            </Text>
                        </Heading>
                    </Stack>
                    <SetupForm />
                </section>
            </Container>
        </MainLayout>
    )
}

export default setup