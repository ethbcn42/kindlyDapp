import { Box, Container, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    
        <Link href="/">
            <Box as="a" cursor={"pointer"} >
                <Image src="/logo.svg" width="200" height={"64"}/>
            </Box>
        </Link>

  )
}

export default Logo