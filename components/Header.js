/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Flex,
  HStack,
} from '@chakra-ui/react';
import ConnectButtonWeb3 from './Web3/ConnectButton';
import Image from 'next/image';

const Header = () => {
    return (
<>
      <Box bg='#7FB5FF' px={4}>
        <Flex h={16} alignItems={'right'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'left'}>
            <Image src="/logo.svg" width="200" height="100"/>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            </HStack>
          </HStack>
          <HStack spacing={8} alignItems={'center'}>
            <ConnectButtonWeb3/>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
    );
}

export default Header;
