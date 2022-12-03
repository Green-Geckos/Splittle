import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Button, Input, Text, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'

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
    console.log(event)
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
    try{
      const sign_result = await signer.signMessage("Sign message to confirm");
      console.log(sign_result);
    }
    catch{
      console.log('Signing message failed');
    }
  }

  return (
    <>
      <EthersNotFound isOpen={isOpen} onClose={onClose} />
      <Flex flexDirection={'column'} fontFamily={'poppins.700'} h='100vh' w='100vw'>
        <Box w='100%' h='80px' maxH={'60px'} bg='brand.purple' >

        </Box>
        <Flex justifyContent={'center'} alignItems='center' h='100%' w='100%' >
          <Flex justifyContent={'center'} alignItems='center' w='80%' h='30vh' maxW='350px' >
            <FormControl>
              <Flex flexDir={'column'} w='100%'>
                <FormLabel mb='8px'>Name:</FormLabel>
                <Input
                  value={name}
                  onChange={handleChange}
                  placeholder='Your name'
                  required={true}
                  size='md'
                />
                <FormHelperText fontSize={'xs'}>This is like a nick name stored with us for this address</FormHelperText>
                <Button onClick={handleConnectWallet} colorScheme='teal' w='100%' size='md' mt={4} >
                  Connect Wallet
                </Button>
              </Flex>
            </FormControl>
          </Flex>

        </Flex>

      </Flex>
    </>
  )
}
