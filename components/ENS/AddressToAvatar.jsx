import React from 'react'
import { useEnsAvatar } from 'wagmi';

export default function Avatar(props) {
    const { data, isLoading, isError } = useEnsAvatar({ address: props.address });
    if (isLoading) return <div><Spinner/></div>
    if (isError) return <div>Error fetching address</div>
    return <div>{data}</div>
}
