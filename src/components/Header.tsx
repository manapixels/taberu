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
import { BsArrowUpRight } from 'react-icons/bs'
import { chakraComponents, Select } from 'chakra-react-select'
import { chains } from '@/constants/chains'

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
                  {/* <Stack
                     textAlign="left"
                     direction={{ base: 'row', md: 'column' }}
                  >
                     <Flex
                        as={ActiveLink}
                        href="/stores"
                        activeClassName="active"
                        p={2}
                        fontSize="sm"
                        borderRadius="md"
                        _hover={{
                           background: 'lightgray.300',
                        }}
                     >
                        <StopCircle
                           stroke="var(--chakra-colors-lightgray-700)"
                           size={18}
                           style={{ marginRight: '.6rem' }}
                        />
                        Stores
                     </Flex>
                  </Stack> */}
               </HStack>
               <Box>
                  {isConnected ? (
                     <Menu>
                        <MenuButton
                           as={Button}
                           rightIcon={<ChevronDown size={15} />}
                           w="100%"
                           px={3}
                           py={2}
                           mb={3}
                           height="auto"
                           borderRadius="md"
                           background="lightgray.200"
                           fontSize="sm"
                           textAlign="left"
                           borderColor="darkgray.100"
                        >
                           <Flex alignItems="center">
                              <Box
                                 width={7}
                                 height={7}
                                 background="lightgray.400"
                                 borderRadius="md"
                                 mr={2}
                              ></Box>
                              <Box>
                                 <Box>{address}</Box>
                              </Box>
                           </Flex>
                        </MenuButton>
                        <MenuList>
                           <MenuItem onClick={() => disconnect()}>
                              Disconnect
                           </MenuItem>
                        </MenuList>
                     </Menu>
                  ) : (
                     <Button
                        variant="outline"
                        fontSize="sm"
                        w="100%"
                        onClick={() => connect()}
                     >
                        Connect Wallet
                     </Button>
                  )}
               </Box>
            </Flex>
         </Container>
      </Box>
   )
}

export default Sidebar
