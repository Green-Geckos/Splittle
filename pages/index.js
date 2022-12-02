import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <div className={styles.container}>
        
      </div>
    </ChakraProvider>
  )
}
