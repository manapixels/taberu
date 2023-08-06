import {
   Box,
   Flex,
   Stack,
   Image as ChakraImage,
   HStack,
   Link,
   Text,
} from '@chakra-ui/react'
import { StopCircle, Plus } from 'react-feather'

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
      <Flex
         flexFlow="column"
         justifyContent="space-between"
         height={{ base: 'auto', md: '100%' }}
         width={{ base: '100%', md: 'auto' }}
         pos={{ base: 'fixed', md: 'relative' }}
         top={{ base: '0', md: 'initial' }}
         left={{ base: '0', md: 'initial' }}
         zIndex="docked"
         background="white"
      >
         <Box mb={2}>
            <Box mb={{ base: 2, md: 5 }}>
               <NextLink href="/">
                  <ChakraImage
                     as={Image}
                     src={logo}
                     alt=""
                     width={{ base: '100px', md: '160px' }}
                     height={{ base: '30.86px', md: '37px' }}
                  />
               </NextLink>
            </Box>
            <Stack
               textAlign="left"
               mt={{ base: 0, md: 4 }}
               mb={{ base: 2, md: 0 }}
               direction={{ base: 'row', md: 'column' }}
            >
               <Flex
                  as={ActiveLink}
                  href="/accounts"
                  w="100%"
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
                  My Accounts
               </Flex>
            </Stack>
         </Box>
         <Box>
            <Flex
               as={ActiveLink}
               href="/jobs/new"
               w="100%"
               activeClassName="active"
               p={2}
               fontSize="sm"
               mb={3}
               borderRadius="md"
               background="lightgray.400"
               _hover={{
                  background: 'lightgray.300',
               }}
            >
               <Plus
                  stroke="var(--chakra-colors-lightgray-700)"
                  size={18}
                  style={{ marginRight: '.6rem' }}
               />
               Add Account
            </Flex>
            {/* <Select
               // isMulti
               menuPlacement="top"
               name="chains"
               options={chainOptions}
               components={customComponents}
            /> */}
            {/* <Box mb={2}>
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
                              <Box>
                                 {address}
                              </Box>
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
            </Box> */}

            <HStack fontSize="xs" color="darkgray.300">
               <Text fontSize="xs" color="darkgray.100">
                  By
               </Text>
               <Link href="https://github.com/manapixels/" target="_blank">
                  <Flex alignItems="center">
                     <Box mr={1}>manapixels</Box>
                     <BsArrowUpRight size="12" />
                  </Flex>
               </Link>
            </HStack>
         </Box>
      </Flex>
   )
}

export default Sidebar
