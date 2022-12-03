import React from 'react';
import { useEnsAddress, useEnsAvatar } from 'wagmi';
import { Spinner } from '@chakra-ui/react'
import { ethers } from 'ethers';

export default function Number(props) {
    const provider = ethers.providers.getDefaultProvider();
    const ensName = provider.lookupAddress(props.address)
    
    return <div>{ensName}</div>
}