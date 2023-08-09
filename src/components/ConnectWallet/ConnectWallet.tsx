import { truncateEthereumAddress } from '@/utils/address'
import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Connector, useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import * as blockies from 'blockies-ts'
import Image from 'next/image'

export default function Index() {
   const { address, isConnected } = useAccount()
   const [blockie, setBlockie] = useState<string>()
   const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
   const { disconnect } = useDisconnect()
   const { data: ensName } = useEnsName({ address })

   const [_isConnected, _setIsConnected] = useState(false)
   const [_connectors, _setConnectors] = useState<Connector<any, any>[]>([])

   useEffect(() => {
      _setIsConnected(isConnected)
   }, [isConnected])

   useEffect(() => {
      _setConnectors(connectors)
   }, [connectors])

   useEffect(() => {
      if (address) {
         setBlockie(blockies.create({ seed: address }).toDataURL())
      }
   }, [address])



   return (
      <Box>
         {_isConnected && (
            <Button onClick={() => disconnect()} variant="black" size="sm">
               {blockie && (
                  <Box mr={1.5}>
                     <Image src={blockie} alt="" width={20} height={20} style={{ borderRadius:".2rem"}} />
                  </Box>
               )}
               {ensName ?? (address && truncateEthereumAddress(address))}
            </Button>
         )}
         {!_isConnected &&
            _connectors.map((connector) => (
               <Button
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  variant="black"
                  size="sm"
               >
                  Connect wallet
                  {isLoading &&
                     pendingConnector?.id === connector.id &&
                     'Connecting'}
               </Button>
            ))}
         {error && <div>{error.message}</div>}
      </Box>
   )
}
