import {
   Avatar,
   Box,
   Button,
   Flex,
   HStack,
   Text,
   useToast,
} from '@chakra-ui/react'
import {
   useAccount,
   useContractRead,
   useContractReads,
   useContractWrite,
   useEnsAvatar,
   useEnsName,
   usePrepareContractWrite,
} from 'wagmi'
import * as blockies from 'blockies-ts'
import { useEffect, useState } from 'react'
import { truncateEthereumAddress } from '@/utils/address'
import pattern from '@/images/pattern.png'
import contractABI from '@/contracts/abi/LoyaltyProgram.json'
const contractAddress = process.env.BASE_GOERLI_LOYALTYPROGRAM_STARBUCKS

import { Oxanium } from 'next/font/google'
import { AbiItem } from 'viem'
import ClientOnly from '@/components/ClientOnly'

const abril = Oxanium({ weight: ['400'], subsets: ['latin-ext'] })

const LoyaltyCard = () => {
   const { address, isConnecting, isDisconnected } = useAccount()
   const [blockie, setBlockie] = useState<string>()
   const toast = useToast()

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
      data: chainData,
      isError: isErrorRead,
      isLoading: isLoadingRead,
   } = useContractReads({
      contracts: [
         {
            address: contractAddress as `0x${string}`,
            abi: contractABI as AbiItem[],
            functionName: 'points',
            //@ts-ignore
            args: [address],
         },
         {
            address: contractAddress as `0x${string}`,
            abi: contractABI as AbiItem[],
            functionName: 'pointValue',
         },
      ],
      watch: true,
   })

   const points = chainData?.[0]?.result ? Number(chainData[0].result) : 0
   const redeemableValue = chainData?.[1]?.result
      ? (Number(chainData[1].result) / Math.pow(10, 18)) * points
      : 0

   const { config } = usePrepareContractWrite({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: 'redeemPoints',
      args: [chainData?.[0]?.result || 0],
      enabled: false
   })
   const { isLoading, write, error } = useContractWrite({
      ...config,
      onSuccess(data) {
         console.log('Success', data)
         toast({
            title: 'Redemption successful',
            status: 'success',
            duration: 3000,
            isClosable: true,
         })
      },
   })

   return (
      <ClientOnly>
         <Flex
            p={1}
            borderWidth={1}
            borderColor="primary.300"
            borderRadius="md"
            style={abril.style}
         >
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
                  letterSpacing={2}
                  fontSize="xs"
                  color="darkgray.200"
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
                  <Box
                     background="darkgray.900"
                     borderRadius="sm"
                     px={3}
                     py={1}
                  >
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
               <Box alignSelf="flex-end">
                  <HStack justifyContent="flex-end">
                     <Box letterSpacing={1} textTransform="uppercase">
                        Points
                     </Box>
                     <Box
                        fontSize={40}
                        fontWeight="bold"
                        lineHeight={1}
                        color="primary.500"
                     >
                        {points}
                     </Box>
                  </HStack>
                  {redeemableValue > 0 && (
                     <Button
                        size="xs"
                        variant="black"
                        onClick={() => write?.()}
                        isLoading={isLoading}
                        loadingText="Redeeming..."
                     >
                        Redeem {redeemableValue} ETH
                     </Button>
                  )}
               </Box>
            </Flex>
         </Flex>
      </ClientOnly>
   )
}

export default LoyaltyCard
