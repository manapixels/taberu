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
   // Drawer,
   // DrawerOverlay,
   // DrawerContent,
   // DrawerCloseButton,
   // DrawerHeader,
   // DrawerBody,
   // DrawerFooter,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import data from '../../dummyStore.json'
import { ArrowRight } from 'react-feather'
import { useState } from 'react'
import { OrderItem } from '@/types/OrderItem'
import { OrderCart } from '@/types/OrderCart'

export default function StorePage() {
   const router = useRouter()
   const [orderType, setOrderType] = useState<string>('dine-in')
   const [cart, setCart] = useState<OrderCart>([])
   // const [selectedItem, setSelectedItem] = useState<OrderItem>()
   // const { isOpen, onOpen, onClose } = useDisclosure()

   const addItem = (_item: OrderItem) => {
      // if cart is empty
      if (cart === undefined || cart.length === 0) {
         setCart([
            {
               item: _item,
               quantity: 1,
            },
         ])
      } else {
         const i = cart?.findIndex((i) => i?.item?.id === _item?.id)
         // if item does not exist in cart
         if (i === -1) {
            setCart((current) => [
               ...current,
               {
                  item: _item,
                  quantity: 1,
               },
            ])
         }
         // if item already exists in cart
         else {
            let newArray = [...cart]
            newArray[i] = {
               ...newArray[i],
               quantity: newArray[i].quantity + 1,
            }
         }
      }
   }

   return (
      <Box>
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
                        <BreadcrumbLink href="/stores">Stores</BreadcrumbLink>
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
                           <Flex p={3} width={{ base: '100%', lg: '33.33%' }}>
                              <Flex
                                 p={4}
                                 background="white"
                                 borderRadius="md"
                                 _hover={{
                                    borderColor: 'blue',
                                    cursor: 'pointer',
                                 }}
                                 border="2px solid transparent"
                                 onClick={() => {
                                    // onOpen()
                                    // setSelectedItem(item)
                                    addItem(item)
                                 }}
                              >
                                 {item.id ? (
                                    <Image
                                       src={`/starbucks/${item.id}.webp`}
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
                              </Flex>
                           </Flex>
                        ))}
                     </Flex>
                  </Box>
               ))}
            </Container>
            {/* <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
               <DrawerOverlay />
               <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Create your account</DrawerHeader>

                  <DrawerBody>
                     {selectedItem?.id ? (
                        <Image
                           src={`/starbucks/${selectedItem?.id}.webp`}
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
                           {selectedItem?.name}
                        </Heading>
                        <Box
                           color="darkgray.100"
                           fontSize="sm"
                           lineHeight="1.5"
                           flex="1"
                           mb={4}
                        >
                           <Text noOfLines={4} title={selectedItem?.description}>
                              {selectedItem?.description}
                           </Text>
                        </Box>
                        <Box>
                           <HStack>
                              <Box mr={1}>$</Box>
                              <Box>{selectedItem?.price.toFixed(2)}</Box>
                           </HStack>
                        </Box>
                     </Flex>
                  </DrawerBody>

                  <DrawerFooter>
                     <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button colorScheme="blue">Save</Button>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer> */}
         </Box>
      </Box>
   )
}
