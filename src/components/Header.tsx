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
   Container,
} from '@chakra-ui/react'
import { StopCircle, Plus, ChevronDown } from 'react-feather'

import ActiveLink from '@/components/Styling/ActiveLink'
import logo from '@/images/logo.svg'
import Image from 'next/image'
import NextLink from 'next/link'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { chakraComponents, Select } from 'chakra-react-select'
import { chains } from '@/constants/chains'
import ConnectWallet from '@/components/ConnectWallet/ConnectWallet'

const chainOptions = chains && [
   ...Object.keys(chains).map((chainId: any) => ({
      value: chainId,
      label: chains[chainId].name,
      icon: (
         <Image
            src={chains[chainId].logo}
            alt={chains[chainId].name}
            width={8}
            height={8}
         />
      ),
   })),
]

const customComponents = {
   // @ts-ignore
   Option: ({ children, ...props }) => (
      // @ts-ignore
      <chakraComponents.Option {...props}>
         <Box mr={2}>{props.data.icon}</Box> {children}
      </chakraComponents.Option>
   ),
   // MultiValueLabel: (props: MultiValueGenericProps<Chain>) => (
   //    <components.MultiValueLabel {...props}>
   //       <Image src={props.data?.icon} width={10} height={10} alt="" />
   //       {props.data?.name}
   //    </components.MultiValueLabel>
   // ),
}

const Sidebar = () => {

   const { address, isConnected } = useAccount()
   const { connect } = useConnect({
      connector: new InjectedConnector(),
   })
   const { disconnect } = useDisconnect()

   return (
      <Box
         pos="sticky"
         top={0}
         zIndex="docked"
         background="white"
         // px={{ base: 4, md: 8 }}
         py={{ base: 2, md: 2 }}
         borderBottomWidth={1}
         borderColor="lightgray.300"
      >
         <Container maxW="container.xl">
            <Flex justifyContent="space-between" width="100%">
               <HStack>
                  <Box mr={4}>
                     <NextLink href="/">
                        <ChakraImage
                           as={Image}
                           src={logo}
                           alt=""
                           width={{ base: '100px', md: '130px' }}
                           height={{ base: '30.86px', md: '37px' }}
                        />
                     </NextLink>
                  </Box>
               </HStack>
               <ConnectWallet />
            </Flex>
         </Container>
      </Box>
   )
}

export default Sidebar
