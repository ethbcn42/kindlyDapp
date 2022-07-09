import { HStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <HStack spacing={8} alignItems={'left'}>
        <Image src="/logo.svg" width="200" height="100"/>
    </HStack>
  )
}

export default Logo