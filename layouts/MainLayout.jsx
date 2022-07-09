import Header from '@components/Header.jsx';
import Footer from "@components/Footer.jsx";
import { Container } from '@chakra-ui/react';

const MainLayout = ({children}) => {
  return (
    <>
      <Header/>
        <Container maxW={'6xl'} minH="calc(100vh - (64px + 102px) )">
          {children}
        </Container>
      <Footer/>
    </>
  )
}

export default MainLayout;