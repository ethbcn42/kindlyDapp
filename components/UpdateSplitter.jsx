import { Container, Heading, Stack, Box, Text } from '@chakra-ui/react'
import useConfigSplitter from '@hooks/useConfigSplitter'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import SetupForm from './SetupForm'
import { CopyBlock } from "react-code-blocks";
import { createSnippet } from '@utils/kindly'


const UpdateSplitter = ({signer, registrationAddress}) => {

    const { currentConfig, splitter } = useConfigSplitter({
        signer,
        address: registrationAddress
    });

    

    // ADD SNIPPETS CODE
    // Create a function that returns an string template
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
                            Is there anything you would like to  <br />
                            <Text as={'span'} color={'#2C83F2'}>
                            modify
                            </Text>
                            ?
                        </Heading>
                    </Stack>
                    <SetupForm contract={splitter} update currentConfig={currentConfig} />
                    <Text>Here are the instructions, you are one step away from getting out of the rabbit hole.</Text>
                    {registrationAddress && <CopyBlock
                        text={createSnippet(registrationAddress)}
                        language={"javascript"}
                        theme={'dracula'}
                    />}
                    <Text>Once you have deployed your NFT Smart Contract you have to go to Opensea and add your kindly address: {registrationAddress}.</Text>
                    {
                        registrationAddress && <img src="/opensea-collaborators-royalties.png" />
                    }
                </section>
            </Container>
        </MainLayout>
    )
}

export default UpdateSplitter