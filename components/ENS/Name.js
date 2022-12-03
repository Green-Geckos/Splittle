import React, { useState, useEffect } from 'react';
import { useEnsAddress, useEnsAvatar } from 'wagmi';
import { Spinner } from '@chakra-ui/react'
import { ethers } from 'ethers';

export default function Number(props) {
    const provider = ethers.providers.getDefaultProvider();
    const [ensName, setEnsData] = useState();

    async function fetchEnsName(){
        const ensNameString = await provider.lookupAddress(props.address)
        setEnsData(() => ensNameString)
    }

    useEffect(() => {
        fetchEnsName()
    }, [])
    
    
    return <div>{ensName}</div>
}