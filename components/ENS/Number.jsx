import React from 'react';
import { useEnsAddress, useEnsAvatar } from 'wagmi';
import { Spinner } from '@chakra-ui/react'

export default function Number(props) {
    const {data, isLoading, isError} = useEnsAddress({
        name: props.ensName,
        chainId: '1'
    })

    if (isLoading) return <div><Spinner/></div>
    if (isError) return <div>Error fetching address</div>
    return <div>{data}</div>
}
