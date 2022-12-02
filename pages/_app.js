import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import "@fontsource/poppins"


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
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
