import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { WagmiConfig, createClient } from 'wagmi';
import { ethers, getDefaultProvider } from 'ethers';

import "@fontsource/poppins"

const client = createClient({
  autoConnect: true,
  provider: new ethers.providers.InfuraProvider(),
})


const theme = extendTheme({
  colors: {
    brand: {
      purple: '#453C67',
      blue: '#6D67E4',
      teal: '#46C2CB',
      yellow: '#F2F7A1',
    }
  },
  fonts: {
    heading: `'poppins', sans-serif`,
    body: `'poppins', sans-serif`,
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  )

}

export default MyApp
