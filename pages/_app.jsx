import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from "react-toastify";


import SEOHeader from '@components/SEO';

import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps}) {
  const { seo } = pageProps;

  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <ChakraProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <SEOHeader {...seo}/>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default MyApp