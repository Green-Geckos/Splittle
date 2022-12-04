import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, 
  Button, Input, Text, 
  FormControl, FormLabel, 
  FormHelperText, FormErrorMessage 
} from '@chakra-ui/react'

import { ethers } from 'ethers'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import EthersNotFound from '../components/AlertBoxes/EthersNotFound';
import abi from "../abi/contract";

import '@fontsource/poppins/700.css'

export default function Index() {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    loadProvider()
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const router = useRouter()

  const onClose = () => {
    window.location.reload(false);
    setIsOpen(false)
  }

  const handleChange = (event) => setName(event.target.value)

  const handleConnectWallet = async (event) => {
    event.preventDefault()
    const connected  = await connectWallet()
    if (connected) {
      const address = await signer.getAddress();
      localStorage.setItem("ACCOUNT_ADDRESS", address);
      await axios.post('/api/addUserHandler', {
        username: name,
        userAddress: address, 
        fileCID : localStorage.getItem("fileCID"),
      });
      const res = await axios.get(
        '/api/getLatestfileCID',
      );
      console.log("fileCID: ", res, res.data.fileCID);
      setIPFSHash(res.data.fileCID);
      localStorage.setItem("fileCID", res.data.fileCID);
      router.push('/home');
    }
  }

  async function storeFileCID() {
    const providerInstance = new ethers.providers.Web3Provider(window.ethereum)
    await providerInstance.send("eth_requestAccounts", []);
    setProvider(() => providerInstance)
    const signerInstance =  providerInstance.getSigner();
    setSigner(() => signerInstance);
    const newFileCID =  await getIPFSHash(signerInstance);
    console.log("newFileCID getIPFS: ", newFileCID);
    localStorage.setItem("fileCID", newFileCID);
  }


  async function getIPFSHash(signer){
    const Ipfs_sc_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const contract = new ethers.Contract(Ipfs_sc_addr, abi, signer)
    const identifier = await contract.getStorageIdentifier();
    return identifier;
  }

  async function setIPFSHash(newFileCID){
    const providerInstance = new ethers.providers.Web3Provider(window.ethereum)
    await providerInstance.send("eth_requestAccounts", []);
    setProvider(() => providerInstance)
    const signerInstance =  providerInstance.getSigner();
    setSigner(() => signerInstance);
    const Ipfs_sc_addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    const contract = new ethers.Contract(Ipfs_sc_addr, abi, signerInstance)
    await contract.setStorageIdentifier(newFileCID);
  }

  useEffect(() => {
    loadProvider()
  }, [])

  async function loadProvider() {
    if (window.ethereum) {
      window.ethereum?.enable();
      await storeFileCID();
    }
    else {
      console.log('Please make sure that you have metamask installed')
      setIsOpen(() => true)
    }
  }

  async function connectWallet() {
    try {
      const sign_result = await signer.signMessage("Sign message to confirm");
      console.log(sign_result);
      return true;
    }
    catch {
      console.log('Signing message failed');
    }
  }

  return (
    <>
      <EthersNotFound isOpen={isOpen} onClose={onClose} />
      <Flex flexDirection={'column'} fontFamily={'poppins.700'} h='100vh' w='100vw'>
        <Box w='100%' h='80px' maxH={'60px'} bg='brand.purple' >

        </Box>
        <Flex justifyContent={'center'} flexDir='column' alignItems='center' h='100%' w='100%' >
          <form onSubmit={handleSubmit(() => { })}>
            <Flex flexDir={'column'} alignItems='center' w='80%' h='30vh' maxW='350px' >
              <FormControl isInvalid={errors.name}>
                <Flex flexDir={'column'} w='100%'>
                  <FormLabel htmlFor='name' mb='8px'>Name:</FormLabel>
                  <Input
                    id='name'
                    placeholder='Your name'
                    {...register('name', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                    onChange={handleChange}
                    size='md'
                  />
                  <FormHelperText
                    fontSize={'xs'}>
                    This is like a nick name stored with us for this address
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>
              <Button
                onClick={handleConnectWallet}
                colorScheme='teal'
                w='100%'
                size='md'
                type='submit'
                mt={4} >
                Connect Wallet
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  )
}
