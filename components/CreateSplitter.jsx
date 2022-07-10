import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import useContract from '@hooks/useRegistryContract'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import SetupForm from './SetupForm'

const CreateSplitter = ({signer}) => {
    const {contract: kindly} = useContract({ signer })


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
                    <SetupForm contract={kindly} />
                </section>
            </Container>
        </MainLayout>
    )
}

export default CreateSplitter