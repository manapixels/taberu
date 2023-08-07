import {
   Box,
   Flex,
   Stack,
   Image as ChakraImage,
   HStack,
   Link,
   Text,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   Button,
} from '@chakra-ui/react'
import { StopCircle, Plus, ChevronDown } from 'react-feather'

import ActiveLink from '@/components/Styling/ActiveLink'
import logo from '@/images/logo.svg'
import Image from 'next/image'
import NextLink from 'next/link'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { chakraComponents, Select } from 'chakra-react-select'

const Sidebar = () => {

   const { address, isConnected } = useAccount()
   const { connect } = useConnect({
      connector: new InjectedConnector(),
   })
   const { disconnect } = useDisconnect()

   return (
      <Flex
         justifyContent="space-between"
         width={{ base: '100%', md: 'auto' }}
         pos={{ base: 'fixed' }}
         top={{ base: '0', md: 'initial' }}
         left={{ base: '0', md: 'initial' }}
         zIndex="docked"
         background="white"
      >
         
         Nearby ...
      </Flex>
   )
}

export default Sidebar
