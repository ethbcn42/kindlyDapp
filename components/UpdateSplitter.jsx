import { Container, Heading, Stack, Box, Text } from '@chakra-ui/react'
import useConfigSplitter from '@hooks/useConfigSplitter'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import SetupForm from './SetupForm'

const UpdateSplitter = ({signer, registrationAddress}) => {

    const {currentConfig, splitter} = useConfigSplitter({
        signer,
        address: registrationAddress
    })
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
                            you can update anytime   <br />
                            <Text as={'span'} color={'#7fb5ff'}>
                                the charity organization and the percentage to donate.
                            </Text>
                        </Heading>
                    </Stack>
                    <p>{registrationAddress}</p>
                    <SetupForm contract={splitter} update />
                </section>
            </Container>
        </MainLayout>
    )
}

export default UpdateSplitter