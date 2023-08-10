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
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import data from '../../dummyStore.json'
import { ArrowRight, Minus, Plus, ShoppingBag } from 'react-feather'
import { useState } from 'react'
import { OrderCart, OrderItem } from '@/types/Order'

export default function StorePage() {
   const router = useRouter()
   const [orderType, setOrderType] = useState<string>('dine-in')
   const [cart, setCart] = useState<OrderCart>({})
   const { isOpen, onOpen, onClose } = useDisclosure()

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

   return (
      <Box pos="relative">
         <Box background="white">
            <Container maxW="container.xl" py="10">
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
                        <BreadcrumbLink href="#" textTransform="capitalize">
                           {router.query.slug}
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                  </Breadcrumb>
               </Box>
               <Heading size="xl" pb={4} pt={2}>
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
            </Container>
         </Box>
         <Box>
            <Container maxW="container.xl" py="10">
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
                                          <Box>{item.price.toFixed(2)}</Box>
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
            </Container>
            <Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
               size="sm"
            >
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

                  <DrawerFooter display="box" p={0} background="white">
                     <Box p={6}>
                        <Heading
                           size="sm"
                           color="darkgray.300"
                           fontWeight="600"
                           mb={4}
                        >
                           Payment Details
                        </Heading>

                        <Flex
                           background="white"
                           borderRadius="md"
                           pos="relative"
                           alignItems="center"
                           justifyContent="space-between"
                           p={2}
                           mb={3}
                        >
                           <Text>Total</Text>
                           <Flex
                              flex="0 0 4rem"
                              justifyContent="space-between"
                              fontSize="120%"
                              fontWeight="bold"
                           >
                              <Box mr={1} color="darkgray.100">
                                 $
                              </Box>
                              <Box>
                                 {Object.values(cart)
                                    .reduce((sum, curr) => {
                                       return (
                                          sum +
                                          curr?.quantity * curr?.item?.price
                                       )
                                    }, 0)
                                    .toFixed(2)}
                              </Box>
                           </Flex>
                        </Flex>
                        <Button
                           colorScheme="primary"
                           px={12}
                           size="lg"
                           width="100%"
                        >
                           Pay
                        </Button>
                     </Box>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </Box>
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
               <Text>
                  {Object.values(cart).reduce((totalQuantity, curr) => {
                     return totalQuantity + curr?.quantity
                  }, 0)}
               </Text>
            </HStack>
         </Button>
      </Box>
   )
}
