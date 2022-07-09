import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps}) {
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
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default MyApp