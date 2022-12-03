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
  <Box w='100%' h='80px' maxH={'60px'} bg='brand.purple' >

  </Box>
    <Flex justifyContent={'center'} alignItems='center' h='100%' w='100%' >
      <Flex justifyContent={'center'} alignItems='center'  w='80%' h='30vh' maxW='350px' >
        <Flex flexDir={'column'} w='100%'>
      <Text mb='8px'>Name: {name}</Text>
      <Input
        value={name}
        onChange={handleChange}
        placeholder='Your name'
        size='sm'
      />
      <Button onClick={handleConnectWallet} colorScheme='teal' w='100%' size='lg' mt={4} >
    Connect Wallet
  </Button>
  </Flex>
      </Flex>

    </Flex>

</Flex>
</> 
  )
}
