import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Flex, HStack, Heading, Tag } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import data from '../../dummyStore.json'
import { ArrowRight } from 'react-feather'

export default function StorePage() {

   const router = useRouter()

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
                        <BreadcrumbLink href="/">Stores</BreadcrumbLink>
                     </BreadcrumbItem>

                     <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" textTransform="capitalize">
                           {router.query.slug}
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                  </Breadcrumb>
               </Box>
               <Heading size="lg" pb={4} pt={2}>
                  {data.name}
               </Heading>
               {data.tags && (
                  <Box>
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
                  </Box>
               )}
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
                        {category.items.map((item, j) => (
                           <Flex
                              p="4"
                              width={{ base: '100%', lg: '33.33%' }}
                              px={3}
                           >
                              <Flex
                                 p={4}
                                 mt={2}
                                 background="white"
                                 borderRadius="md"
                                 _hover={{
                                    borderColor: 'blue',
                                    cursor: 'pointer',
                                 }}
                                 border="2px solid transparent"
                              >
                                 <Box
                                    width="28"
                                    height="28"
                                    flex="0 0 var(--chakra-sizes-28)"
                                    background="lightgray.200"
                                    borderRadius="md"
                                    mr={3}
                                 ></Box>
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
                                       {item.description}
                                    </Box>
                                    <Box>{item.price}</Box>
                                 </Flex>
                              </Flex>
                           </Flex>
                        ))}
                     </Flex>
                  </Box>
               ))}
            </Container>
         </Box>
      </Box>
   )
}
