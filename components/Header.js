/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons' ;
import ConnectButtonWeb3 from './Web3/ConnectButton';
// import Link from "next/link";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

    return (
<>
      <Box bg={useColorModeValue('blue.100', 'blue.900')} px={4}>
        <Flex h={16} alignItems={'right'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
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

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            
          </Box>
        ) : null}
      </Box>
    </>
    );
}

export default Header;
