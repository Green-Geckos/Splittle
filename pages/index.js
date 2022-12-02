import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChakraProvider } from '@chakra-ui/react'

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import EthersNotFound from '../components/AlertBoxes/EthersNotFound'

export default function Home() {

  const [isOpen,setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  useEffect(()=>{
    loadProvider()
  },[])

  async function loadProvider(){
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    
      await provider.send('eth_requestAccounts',[]);
  
      const signer = provider.getSigner()
  
      console.log(signer);
    }
    else{
      console.log('Please make sure that you have metamask installed')
      setIsOpen(() => true)
    }
  }


  return (
    <ChakraProvider>
      <div className={styles.container}>
        <EthersNotFound isOpen={isOpen} onClose={onClose} />
      </div>
    </ChakraProvider>
  )
}
