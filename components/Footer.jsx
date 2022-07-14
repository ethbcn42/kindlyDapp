import {
    Box,
    chakra,
    Container,
    Flex,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
  import { ReactNode } from 'react';
import Logo from './Logo';
  
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function SmallWithLogoLeft() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        display="fixed"
        >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Logo />
            <Text as={"div"}><Flex align={"center"}>Kindly at BCNHACK 2022 with love from Spaniards in the <img src="/aticco.png" width="80" /> terrace.</Flex></Text>
            <Stack direction={'row'} spacing={6}>
             <SocialButton label={'Twitter'} href={'https://twitter.com/kindlyweb3'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'https://twitter.com/kindlyweb3'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Github'} href={'https://github.com/ethbcn42'}>
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    );
  }
