import { Box, Container, Grid, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Tooltip } from 'web3uikit';
import colabs from './ColabsList'


const ColabItem = ({ colab }) => {
    const { name, image } = colab;

    return (
        <Container>
            <Image src={image} height={"80px"} alt={name} />
        </Container>
    )
}

const Colabs = () => {
    return (
        <Box width={"100%"} p={"8"} textAlign="center" alignItems={"center"} justifyItems="center">
            <Text fontSize={"lg"} fontWeight="bold" borderBottom={"solid 1px"} color={"#2C83F2"} p={"2"} mb="2">
                Partners
            </Text>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {colabs.map((colab) => <ColabItem key={colab?.name?.replace(" ", "-")} colab={colab} />)}
            </Grid>
        </Box>
    )
}

export default Colabs