import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import MainLayout from '@layouts/MainLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

const setup = () => {
    const { user, isAuthenticated } = useMoralis()
    const router = useRouter()

    if (!isAuthenticated || !user) {
        return (
            <MainLayout>
                <h1>Setup Kindly</h1>
                <p>
                    Please connect to your wallet to continue.
                </p>
            </MainLayout>
        )
    }
    return (
        <MainLayout>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Container maxW={'3xl'}>

                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}>
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
            </Container>
        </MainLayout>
    )
}

export default setup