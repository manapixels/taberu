import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useAccount, useContractRead, useEnsAvatar, useEnsName } from 'wagmi'
import * as blockies from 'blockies-ts'
import { useEffect, useState } from 'react'
import { truncateEthereumAddress } from '@/utils/address'
import pattern from '@/images/pattern.png'
import contractABI from '@/contracts/abi/LoyaltyProgram.json'
const contractAddress = process.env.BASE_GOERLI_LOYALTYPROGRAM_STARBUCKS

const LoyaltyCard = () => {
   const { address, isConnecting, isDisconnected } = useAccount()
   const [blockie, setBlockie] = useState<string>()

   useEffect(() => {
      if (address) {
         setBlockie(blockies.create({ seed: address }).toDataURL())
      }
   }, [address])

   const {
      data: ensName,
      isError: isErrorEnsName,
      isLoading: isLoadingEnsName,
   } = useEnsName({
      address: address,
      chainId: 1,
   })
   const {
      data: ensAvatar,
      isError: isErrorEnsAvatar,
      isLoading: isLoadingEnsAvatar,
   } = useEnsAvatar({
      name: ensName,
      chainId: 1,
   })

   const {
      data: stamps,
      isError: isErrorRead,
      isLoading: isLoadingRead,
   } = useContractRead({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: 'stamps',
      args: [address],
      watch: true,
   })

   return (
      <Flex p={1} borderWidth={1} borderColor="primary.300" borderRadius="md">
         <Flex
            flexDirection="column"
            borderRadius="md"
            // background="darkgray.800"
            py={4}
            px={6}
            pos="relative"
            color="white"
            minWidth={72}
            backgroundImage={`url(${pattern.src})`}
         >
            <Text
               textTransform="uppercase"
               letterSpacing={0.5}
               fontSize="sm"
               color="darkgray.100"
               fontWeight="bold"
            >
               Membership
            </Text>
            <Avatar
               pos="absolute"
               top={4}
               right={4}
               src="/starbucks/logo.svg"
               width={10}
               height={10}
            />
            <HStack pt={4} mb={4}>
               <Box>
                  {ensAvatar ? (
                     <Avatar
                        name={ensName || ''}
                        src={ensAvatar}
                        size="md"
                        bg="primary.500"
                     />
                  ) : (
                     <Avatar
                        name={ensName || ''}
                        src={blockie}
                        size="md"
                        bg="primary.500"
                     />
                  )}
               </Box>
               <Box background="darkgray.900" borderRadius="sm" px={3} py={1}>
                  {ensName && (
                     <Text
                        fontSize="sm"
                        color="lightgray.600"
                        fontWeight="bold"
                     >
                        {ensName}
                     </Text>
                  )}
                  {address && (
                     <Text fontSize="xs" color="darkgray.100">
                        {truncateEthereumAddress(address)}
                     </Text>
                  )}
               </Box>
            </HStack>
            <HStack alignSelf="flex-end">
               <Box letterSpacing={1} textTransform="uppercase">
                  Points
               </Box>
               <Box
                  fontSize={40}
                  fontWeight="bold"
                  lineHeight={1}
                  color="primary.500"
               >
                  {Number(stamps)}
               </Box>
            </HStack>
         </Flex>
      </Flex>
   )
}

export default LoyaltyCard
