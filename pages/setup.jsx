import { Container } from '@chakra-ui/react';
import MainLayout from '@layouts/MainLayout';
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
            <Container p={"1em"} >
                <h1>Setup Kindly { user.get("ethAddress") }</h1>
            </Container>
        </MainLayout>
    )
}

export default setup