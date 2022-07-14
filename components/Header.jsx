/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Flex,
  HStack,
} from '@chakra-ui/react';
//import ConnectButtonWeb3 from './Web3/ConnectButton';

import dynamic from 'next/dynamic';

import Image from 'next/image';
import Logo from './Logo';

// dynamic import for web3 connect button
const ConnectButtonWeb3 = dynamic(() => import('./Web3/ConnectButton'), {
  ssr: false,
});

const Header = () => {
    return (
<>
      <Box shadow={"lg"} px={4}>
        <Flex h={16} alignItems="center" justifyContent={'space-between'}>
          <Logo />
          <HStack spacing={8} alignItems={'center'}>
            <ConnectButtonWeb3/>

          </HStack>
        </Flex>
      </Box>
    </>
    );
}

export default Header;
