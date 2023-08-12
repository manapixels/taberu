'use client'

import { truncateEthereumAddress } from '@/utils/address'
import {
   Box,
   Button,
   HStack,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
   Connector,
   useAccount,
   useConnect,
   useDisconnect,
   useEnsName,
   useNetwork,
   useSwitchNetwork,
} from 'wagmi'
import * as blockies from 'blockies-ts'
import Image from 'next/image'
import { chains as chainList } from '@/constants/chains'
import { ChevronDown } from 'react-feather'
import ClientOnly from '@/components/ClientOnly'

export default function Index() {
   const { address, isConnected } = useAccount()
   const [blockie, setBlockie] = useState<string>()
   const { data: ensName } = useEnsName({ address, chainId: 1 })

   const { chain } = useNetwork()
   const {
      chains,
      error: switchNetworkError,
      isLoading: switchNetworkIsLoading,
      pendingChainId,
      switchNetwork,
   } = useSwitchNetwork()
   const { connect, connectors, error, isLoading, pendingConnector, data } =
      useConnect()
   const { disconnect } = useDisconnect()

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
      <HStack>
         <ClientOnly>
            {_isConnected && chain && (
               <Menu>
                  <MenuButton
                     as={Button}
                     size="sm"
                     rightIcon={<ChevronDown size={12} />}
                  >
                     <Box>
                        <Image
                           src={chainList[chain?.id]?.logo}
                           alt=""
                           width={20}
                           height={20}
                        />
                     </Box>
                  </MenuButton>

                  <MenuList>
                     {Object.entries(chainList).map(([key, value], index) => (
                        <MenuItem
                           minH="48px"
                           key={`chain-${value?.name}`}
                           onClick={() => key && switchNetwork?.(parseInt(key))}
                           background={
                              chain?.id === parseInt(key)
                                 ? 'var(--chakra-colors-gray-200)'
                                 : 'unset'
                           }
                           _hover={{
                              background: 'var(--chakra-colors-gray-200)',
                           }}
                        >
                           <Image
                              src={value?.logo}
                              alt=""
                              width={20}
                              height={20}
                           />
                           <Box ml={2}>{value?.name}</Box>
                        </MenuItem>
                     ))}
                  </MenuList>
               </Menu>
            )}
            {_isConnected && (
               <Button onClick={() => disconnect()} variant="black" size="sm">
                  {blockie && (
                     <Box mr={1.5}>
                        <Image
                           src={blockie}
                           alt=""
                           width={20}
                           height={20}
                           style={{ borderRadius: '.2rem' }}
                        />
                     </Box>
                  )}
                  {ensName
                     ? ensName
                     : address && truncateEthereumAddress(address)}
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
         </ClientOnly>
      </HStack>
   )
}
