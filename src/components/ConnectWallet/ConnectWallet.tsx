import { truncateEthereumAddress } from '@/utils/address'
import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Connector, useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'

export default function Index() {
   const { address, isConnected } = useAccount()
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

   return (
      <Box>
         {_isConnected && (
            <Button onClick={() => disconnect()} variant="black" size="sm">
               Connected to{' '}
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
