import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Button, Input, Text } from '@chakra-ui/react'

import { ethers } from 'ethers'
import EthersNotFound from '../components/AlertBoxes/EthersNotFound'

import '@fontsource/poppins/700.css'

export default function Index() {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [signer, setSigner] = useState();

  const router = useRouter()

  const onClose = () => {
    window.location.reload(false);
    setIsOpen(false)
  }

  const handleChange = (event) => setName(event.target.value)
  const handleConnectWallet = (event) => {
    event.preventDefault()
    connectWallet()
    // router.push('/home')
  }

  useEffect(() => {
    loadProvider()
  }, [])

  async function loadProvider() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send('eth_requestAccounts', []);

      const signerInstance = provider.getSigner();
      setSigner(() => signerInstance);
    }
    else {
      console.log('Please make sure that you have metamask installed')
      setIsOpen(() => true)
    }
  }

  async function connectWallet(){
    const sign_result = await signer.signMessage("Sign message to confirm");
    console.log(sign_result);
  }

  return (
    <>
      <EthersNotFound isOpen={isOpen} onClose={onClose} />
      <Flex flexDirection={'column'} fontFamily={'poppins.700'} h='100vh' w='100vw'>
        <Box w='100%' h='80px' maxH={'60px'} bg='brand.purple' >

        </Box>
        <Flex justifyContent={'center'} alignItems='center' h='100%' w='100%' >
          <Flex justifyContent={'center'} alignItems='center' w='80%' h='30vh' maxW='350px' >
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
