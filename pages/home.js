import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Button, Input, Text } from '@chakra-ui/react'

import '@fontsource/poppins/700.css'

export default function Index() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleChange = (event) => setName(event.target.value)
  const handleConnectWallet = (event) => {
    event.preventDefault()
    router.push('/home')
  }

  return (  
      <>
<Flex flexDirection={'column'} fontFamily={'poppins.700'} h='100vh' w='100vw'>
  <Box w='100%' h={'80px'} bg='brand.purple' >

  </Box>
    <Flex justifyContent={'center'} alignItems='center' h='100%' w='100%' >
     Hello

    </Flex>

</Flex>
</> 
  )
}
