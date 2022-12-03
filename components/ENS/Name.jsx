import React, { useState, useEffect } from 'react';
import { useEnsAddress, useEnsAvatar } from 'wagmi';
import { Spinner } from '@chakra-ui/react'
import { ethers } from 'ethers';

export default function Number(props) {
    const baseUrl = process.env.NEXT_PUBLIC_INFURA_MAINNET_URL;
    const provider = new ethers.providers.JsonRpcProvider(baseUrl);
    const [ensName, setEnsData] = useState();

    async function fetchEnsName(){
        const ensNameString = await provider.lookupAddress(props.ensName)
        setEnsData(() => ensNameString)
    }

    useEffect(() => {
        fetchEnsName()
    }, [])
    
    
    return <div>{ensName}</div>
}