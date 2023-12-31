import {
   Box,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   Button,
   Container,
   Flex,
   HStack,
   Heading,
   Image,
   RadioGroup,
   Tag,
   Text,
   Radio,
   useDisclosure,
   Drawer,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   DrawerHeader,
   DrawerBody,
   DrawerFooter,
   TabPanels,
   TabPanel,
   TabList,
   Tab,
   Tabs,
   TabIndicator,
   Tooltip,
   Badge,
   Link,
   useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import data from '../../dummyStore.json'
import {
   ArrowRight,
   ChevronDown,
   ExternalLink,
   Minus,
   Plus,
   ShoppingBag,
} from 'react-feather'
import { useEffect, useRef, useState } from 'react'
import { OrderCart, OrderItem } from '@/types/Order'
import {
   useAccount,
   useContractWrite,
   useNetwork,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import useETHBalance from '@/hooks/useETHBalance'
import { useEffectOnce } from 'react-use'
import { getEthereumPrice } from '@/services/coingecko-price-2'
import { parseEther } from 'viem'
import { chains } from '@/constants/chains'

import contractABI from '@/contracts/abi/LoyaltyProgram.json'
import LoyaltyCard from '@/components/LoyaltyCard/LoyaltyCard'
import { useRecentTransactions } from '@/hooks/useRecentTransactions'
import { getFormattedDate, getFormattedDateTime } from '@/utils/datetime'
import { truncateEthereumAddress } from '@/utils/address'


export default function StorePage() {
   const router = useRouter()
   const [orderType, setOrderType] = useState<string>('dine-in')
   const [cart, setCart] = useState<OrderCart>({})
   const totalToPay = Object.values(cart).reduce((sum, curr) => {
      return sum + curr?.quantity * curr?.item?.price
   }, 0)
   const totalQuantity = Object.values(cart).reduce(
      (count, curr) => count + curr?.quantity,
      0
   )
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()

   const { chain } = useNetwork()
   const { address, isConnected } = useAccount()
   // const USDC_TOKEN_CONTRACT =
   //    typeof chain?.id === 'number' && contracts?.[chain.id]?.USDC
   const balance = useETHBalance({
      userAddress: address,
      chainId: chain?.id,
   })
   const [currencyValue, setCurrencyValue] = useState<number>(0)

   useEffectOnce(() => {
      const getCurrencyPrice = async () => {
         const _currencyValue = await getEthereumPrice()
         setCurrencyValue(_currencyValue)
      }
      getCurrencyPrice()
   })

   const contractAddress = chain?.id ? chains?.[chain.id]?.loyaltyContract : undefined

   const { config} = usePrepareContractWrite({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: 'payWithETH',
      ...(currencyValue &&
         currencyValue > 0 && {
            value: parseEther((totalToPay / currencyValue).toString()),
         }),
   })

   const { data: contractWriteResponse, write, error } = useContractWrite(config)

   const { isLoading } = useWaitForTransaction({
      hash: contractWriteResponse?.hash,
      onSuccess(data) {
         onClose()
         fetchTxns()
         toast({
            title: 'Paid successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
         })
         setCart({})
      },
   })

   const { txns, fetchTxns } = useRecentTransactions(
      address,
      contractAddress,
      chain?.id
   )

   const addItem = (_item: OrderItem) => {
      // if cart is empty
      if (Object.entries(cart).length === 0) {
         setCart({
            [_item.id]: {
               item: _item,
               quantity: 1,
            },
         })
      } else {
         // if item already exists in cart
         if (_item.id in cart) {
            let newObj: OrderCart = JSON.parse(JSON.stringify(cart))
            newObj[_item.id] = {
               ...newObj[_item.id],
               quantity: newObj[_item.id].quantity + 1,
            }
            setCart(newObj)
         }
         // if item does not exist in cart
         else {
            setCart((current) => ({
               ...current,
               [_item.id]: {
                  item: _item,
                  quantity: 1,
               },
            }))
         }
      }
   }

   const removeItem = (_item: OrderItem) => {
      if (_item.id in cart) {
         let copy: OrderCart = JSON.parse(JSON.stringify(cart))
         // if item quantity is currently 1, remove it from cart
         if (copy[_item.id].quantity - 1 === 0) {
            delete copy[_item.id]
            setCart(copy)
         } else {
            copy[_item.id].quantity -= 1
            setCart(copy)
         }
      }
   }

   // Header shrinks when scrolled past
   // =========================================

   const [isScrolledPast, setScrolledPast] = useState(false)

   const headerRef = useRef<HTMLDivElement>(null)

   const handleScroll = () => {
      if (headerRef.current) {
         // Get the div's height in pixels
         const height = headerRef.current.clientHeight

         if (window.pageYOffset > height || document.body.scrollTop > height) {
            setScrolledPast(true)
         } else {
            setScrolledPast(false)
         }
      }
   }

   useEffect(() => {
      // Adding the scroll listener
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
         // Removing listener
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return (
      <>
         <Box
            background="white"
            ref={headerRef}
            // pos="sticky"
            // top={10}
            // zIndex="1099"
         >
            <Container maxW="container.xl" py="10">
               <Flex justifyContent="space-between">
                  <Box>
                     <Box>
                        <Breadcrumb
                           spacing="8px"
                           fontSize="sm"
                           color="darkgray.100"
                           separator={<ArrowRight size="10" />}
                        >
                           <BreadcrumbItem>
                              <BreadcrumbLink>Stores</BreadcrumbLink>
                           </BreadcrumbItem>

                           <BreadcrumbItem isCurrentPage>
                              <BreadcrumbLink
                                 href="#"
                                 textTransform="capitalize"
                              >
                                 {router.query.slug}
                              </BreadcrumbLink>
                           </BreadcrumbItem>
                        </Breadcrumb>
                     </Box>
                     <Heading size={isScrolledPast ? 'md' : 'xl'} pb={4} pt={2}>
                        {data.name}
                     </Heading>
                     {data.tags && (
                        <HStack mb={3} spacing={2}>
                           {data.tags.map((tag, i) => (
                              <Tag
                                 key={`tag-${tag.name}`}
                                 color="darkgray.100"
                                 background="lightgray.200"
                                 size="sm"
                              >
                                 {tag.name}
                              </Tag>
                           ))}
                        </HStack>
                     )}
                     <Box>
                        <RadioGroup
                           defaultValue="dine-in"
                           borderWidth={1}
                           borderColor="lightgray.600"
                           borderRadius="md"
                           padding={1}
                           width="fit-content"
                           // value={orderType}
                        >
                           <Button
                              mr={3}
                              colorScheme={
                                 orderType === 'dine-in' ? 'primary' : 'gray'
                              }
                              onClick={() => setOrderType('dine-in')}
                           >
                              <Radio
                                 value="Dine-in"
                                 w="100%"
                                 h="100%"
                                 bg="white"
                                 _checked={{ bg: 'primary.700' }}
                              >
                                 Dine-in
                              </Radio>
                           </Button>
                           <Button
                              colorScheme={
                                 orderType === 'takeaway' ? 'primary' : 'gray'
                              }
                              onClick={() => setOrderType('takeaway')}
                           >
                              <Radio
                                 value="Takeaway"
                                 w="100%"
                                 h="100%"
                                 bg="white"
                                 _checked={{ bg: 'primary.700' }}
                              >
                                 Takeaway
                              </Radio>
                           </Button>
                        </RadioGroup>
                     </Box>
                  </Box>
                  <LoyaltyCard />
               </Flex>
            </Container>
         </Box>
         <Tabs size="md">
            <Box background="white">
               <Container maxW="container.xl">
                  <TabList>
                     <Tab
                        _selected={{
                           fontWeight: 'bold',
                           color: 'primary.500',
                        }}
                        color="darkgray.100"
                        py={4}
                     >
                        Menu
                     </Tab>
                     <Tab
                        _selected={{
                           fontWeight: 'bold',
                           color: 'primary.500',
                        }}
                        color="darkgray.100"
                        py={4}
                     >
                        <HStack>
                           <Box>Past Purchases </Box>
                           {txns && txns.length > 0 && (
                              <Badge
                                 background="primary.500"
                                 color="white"
                                 ml={1}
                                 fontSize="sm"
                              >
                                 {txns.length}
                              </Badge>
                           )}
                        </HStack>
                     </Tab>
                  </TabList>
                  <TabIndicator
                     mt="-1.5px"
                     height="2px"
                     bg="primary.500"
                     borderRadius="1px"
                  />
               </Container>
            </Box>
            <Container maxW="container.xl" py="10">
               <TabPanels>
                  <TabPanel>
                     {data.menu.map((category, i) => (
                        <Box key={`category-${category.category}`} mb="10">
                           <Heading size="md" color="darkgray.600">
                              {category.category}
                           </Heading>
                           <Flex p="4" wrap="wrap" mx={-3}>
                              {category.items.map((item: OrderItem, j) => (
                                 <Flex
                                    p={3}
                                    width={{ base: '100%', lg: '33.33%' }}
                                    key={`item-${item.id}`}
                                 >
                                    <Flex
                                       p={4}
                                       background="white"
                                       borderRadius="md"
                                       _hover={{
                                          borderColor: 'blue',
                                          cursor: 'pointer',
                                       }}
                                       border="2px solid transparent"
                                       onClick={() =>
                                          !cart?.[item?.id] && addItem(item)
                                       }
                                       role="group"
                                       pos="relative"
                                    >
                                       {item.id ? (
                                          <Image
                                             // src={`/starbucks/${item.id}.webp`}
                                             src={`https://cloudflare-ipfs.com/ipfs/QmULhRQsgNyT4WS4kBFCCH2q2esYLQPqLV4ztDMngVDo4c/${item.id}.webp`}
                                             width="28"
                                             height="28"
                                             flex="0 0 var(--chakra-sizes-28)"
                                             background="lightgray.200"
                                             borderRadius="md"
                                             mr={3}
                                          />
                                       ) : (
                                          <Box
                                             width="28"
                                             height="28"
                                             flex="0 0 var(--chakra-sizes-28)"
                                             background="lightgray.200"
                                             borderRadius="md"
                                             mr={3}
                                          ></Box>
                                       )}
                                       <Flex flexDirection="column">
                                          <Heading
                                             size="sm"
                                             fontWeight="600"
                                             fontSize="md"
                                             pb={2}
                                          >
                                             {item.name}
                                          </Heading>
                                          <Box
                                             color="darkgray.100"
                                             fontSize="sm"
                                             lineHeight="1.5"
                                             flex="1"
                                             mb={4}
                                          >
                                             <Text
                                                noOfLines={4}
                                                title={item.description}
                                             >
                                                {item.description}
                                             </Text>
                                          </Box>
                                          <Box>
                                             <HStack>
                                                <Box mr={1}>$</Box>
                                                <Box>
                                                   {item.price.toFixed(2)}
                                                </Box>
                                             </HStack>
                                          </Box>
                                       </Flex>

                                       {cart?.[item?.id] &&
                                       cart[item.id].quantity > 0 ? (
                                          <HStack
                                             spacing={1}
                                             borderWidth={1}
                                             borderColor="primary.500"
                                             pos="absolute"
                                             bottom={4}
                                             right={4}
                                             borderRadius="md"
                                             p={1}
                                             boxShadow="0px 5px 0px 0px var(--chakra-colors-primary-500)"
                                          >
                                             <Button
                                                size="sm"
                                                onClick={() => removeItem(item)}
                                             >
                                                <Minus size={10} />
                                             </Button>
                                             <Box px={2}>
                                                {cart?.[item?.id]?.quantity}
                                             </Box>
                                             <Button
                                                size="sm"
                                                onClick={() => addItem(item)}
                                             >
                                                <Plus size={10} />
                                             </Button>
                                          </HStack>
                                       ) : (
                                          <Box
                                             opacity={0}
                                             borderRadius="md"
                                             background="primary.500"
                                             pos="absolute"
                                             bottom={4}
                                             right={4}
                                             _groupHover={{ opacity: '1' }}
                                             p={2}
                                          >
                                             <Plus color="white" />
                                          </Box>
                                       )}
                                    </Flex>
                                 </Flex>
                              ))}
                           </Flex>
                        </Box>
                     ))}
                  </TabPanel>
                  <TabPanel>
                     {txns?.map((t, i) => (
                        <Flex
                           background="white"
                           borderRadius="md"
                           px={6}
                           py={4}
                           mb={4}
                           borderWidth={1}
                           borderColor="lightgray.400"
                           key={t?.tx_hash}
                        >
                           <Flex
                              px={8}
                              color="primary.800"
                              background="primary.100"
                              borderRadius="md"
                              justifyContent="center"
                              alignItems="center"
                              mr={5}
                           >
                              {i + 1}
                           </Flex>
                           <Box>
                              <Box
                                 color="darkgray.300"
                                 letterSpacing="0.03rem"
                                 fontSize="xs"
                              >
                                 {t?.block_signed_at &&
                                    getFormattedDateTime(t.block_signed_at)}
                              </Box>
                              <HStack>
                                 <Box mr={1}>
                                    Spent: {t?.pretty_value_quote}
                                 </Box>
                                 <Box fontSize="sm" color="darkgray.500">
                                    (+{' '}
                                    <Tooltip label="Transaction fee">
                                       {t?.pretty_gas_quote}
                                    </Tooltip>
                                    )
                                 </Box>
                              </HStack>
                              {t?.tx_hash && (
                                 <HStack
                                    as={Link}
                                    href={
                                       chain?.id
                                          ? `${
                                               chains[chain.id]?.explorerURL
                                            }/tx/${t.tx_hash}`
                                          : '#'
                                    }
                                    target="_blank"
                                    fontSize="sm"
                                    color="darkgray.100"
                                 >
                                    <Box>
                                       {truncateEthereumAddress(t.tx_hash)}
                                    </Box>
                                    <ExternalLink
                                       size={14}
                                       color="var(--chakra-colors-darkgray-100)"
                                    />
                                 </HStack>
                              )}
                           </Box>
                        </Flex>
                     ))}
                  </TabPanel>
               </TabPanels>
            </Container>
         </Tabs>

         <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
            <DrawerOverlay />
            <DrawerContent background="lightgray.200">
               <DrawerCloseButton />
               <DrawerHeader background="white">Order summary</DrawerHeader>

               <DrawerBody>
                  {Object.entries(cart).map(([itemId, itemOrder], i) => (
                     <Flex
                        key={`item-${itemId}`}
                        background="white"
                        borderRadius="md"
                        pos="relative"
                        alignItems="center"
                        p={3}
                        mb={3}
                     >
                        <Flex>
                           {itemOrder?.item?.id ? (
                              <Image
                                 src={`/starbucks/${itemOrder?.item?.id}.webp`}
                                 width="12"
                                 height="12"
                                 flex="0 0 var(--chakra-sizes-12)"
                                 background="lightgray.200"
                                 borderRadius="md"
                                 mr={3}
                              />
                           ) : (
                              <Box
                                 width="12"
                                 height="12"
                                 flex="0 0 var(--chakra-sizes-12)"
                                 background="lightgray.200"
                                 borderRadius="md"
                                 mr={3}
                              ></Box>
                           )}
                           <Box pb={2} lineHeight={1.2}>
                              {itemOrder?.item?.name}
                           </Box>
                        </Flex>

                        <Flex flex="0 0 3rem" justifyContent="center" ml={3}>
                           <Box
                              background="primary.100"
                              color="primary.500"
                              width="fit-content"
                              borderRadius="md"
                              fontWeight="bold"
                              fontSize="sm"
                              px={2}
                              py={1}
                           >
                              {itemOrder?.quantity}x
                           </Box>
                        </Flex>

                        <Flex
                           flex="0 0 4rem"
                           textAlign="right"
                           justifyContent="space-between"
                           ml={2}
                        >
                           <Box mr={1} color="darkgray.100">
                              $
                           </Box>
                           <Box>{itemOrder?.item?.price.toFixed(2)}</Box>
                        </Flex>
                     </Flex>
                  ))}
               </DrawerBody>

               <DrawerFooter
                  display="box"
                  p={0}
                  background="white"
                  borderTop="1px solid var(--chakra-colors-lightgray-400)"
               >
                  <Flex
                     justifyContent="space-between"
                     borderBottom="1px solid var(--chakra-colors-lightgray-400)"
                     px={6}
                     py={3}
                  >
                     <Heading size="sm" color="darkgray.300" fontWeight="600">
                        Payment Details
                     </Heading>
                     <HStack color="darkgray.100">
                        <Box>on</Box>
                        {chain && (
                           <HStack>
                              <Image
                                 src={chains[chain.id]?.logo}
                                 alt=""
                                 width={4}
                                 height={4}
                              />
                              <i style={{ marginLeft: '.1rem' }}>
                                 {chains[chain.id]?.name}
                              </i>
                           </HStack>
                        )}
                     </HStack>
                  </Flex>
                  <Box p={6}>
                     <Flex justifyContent="space-between" alignItems="center">
                        <HStack>
                           <Box>Pay by</Box>
                           <Button>
                              <Image
                                 src="/chains/ethereum.svg"
                                 alt=""
                                 width={5}
                                 height={5}
                                 mr={2}
                              />
                              <Text mr={2}>ETH</Text>
                              <ChevronDown size={12} />
                           </Button>
                        </HStack>
                        <HStack textAlign="right" fontSize="lg">
                           <Text color="darkgray.100" mr={1}>
                              Balance:{' '}
                           </Text>
                           <Text>{(balance / 10 ** 18).toFixed(2)} ETH</Text>
                        </HStack>
                     </Flex>

                     <Flex
                        background="white"
                        borderRadius="md"
                        pos="relative"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}
                     >
                        <Text>Total</Text>
                        <Box justifyContent="flex-end">
                           <HStack
                              spacing={1}
                              flex="0 0 4rem"
                              fontSize="120%"
                              fontWeight="bold"
                              justifyContent="flex-end"
                           >
                              <Box
                                 mr={1}
                                 color="darkgray.100"
                                 fontSize="120%"
                                 fontWeight="bold"
                              >
                                 $
                              </Box>
                              <Box fontSize="120%" fontWeight="bold">
                                 {totalToPay.toFixed(2)}
                              </Box>
                           </HStack>
                           <Flex
                              alignItems="center"
                              fontSize="sm"
                              wrap="nowrap"
                              color="darkgray.100"
                           >
                              (≈{' '}
                              {currencyValue &&
                                 (totalToPay / currencyValue).toPrecision(
                                    3
                                 )}{' '}
                              ETH )
                           </Flex>
                        </Box>
                     </Flex>
                     <Button
                        colorScheme="primary"
                        px={12}
                        size="lg"
                        width="100%"
                        onClick={() => write?.()}
                        disabled={!write || isLoading}
                        isLoading={isLoading}
                        loadingText="Paying..."
                     >
                        Pay{' '}
                        {currencyValue &&
                           (totalToPay / currencyValue).toPrecision(3)}{' '}
                        ETH
                     </Button>
                  </Box>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
         <Button
            opacity={Object.keys(cart).length > 0 ? 1 : 0}
            borderRadius="lg"
            background="primary.500"
            pos="fixed"
            bottom={4}
            right={4}
            p={3}
            variant="primary"
            onClick={() => onOpen()}
            size="xl"
         >
            <HStack>
               <ShoppingBag color="white" size={30} />
               <Text>{totalQuantity}</Text>
            </HStack>
         </Button>
      </>
   )
}
