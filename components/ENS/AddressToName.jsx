import React, { useState, useEffect } from 'react';
import { useEnsAddress, useEnsAvatar } from 'wagmi';
import { Spinner } from '@chakra-ui/react'
import { ethers } from 'ethers';

export default function AddressToName(props) {
    const baseUrl = process.env.NEXT_PUBLIC_INFURA_MAINNET_URL;
    const provider = new ethers.providers.JsonRpcProvider(baseUrl);
    const [ensName, setEnsName] = useState();

    async function fetchEnsName(){
        const ensNameString = await provider.lookupAddress(props.address)
        setEnsName(() => ensNameString)
    }

    useEffect(() => {
        fetchEnsName()
    }, [])
    
    
    return <div>{ensName}</div>
}