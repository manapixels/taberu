import { chains } from '@/constants/chains'
import { useEffect, useState } from 'react'

export default function useTokenBalance({
   chainId,
   tokenAddress,
   userAddress,
}: {
   chainId?: number
   tokenAddress?: `0x${string}`
   userAddress?: `0x${string}`
}) {
   const [balance, setBalance] = useState<number>(0)

   useEffect(() => {
      const fetchBalance = async () => {
         if (
            chainId &&
            tokenAddress &&
            userAddress &&
            chains?.[chainId]?.explorerAPI
         ) {
            await fetch(
               `${chains?.[chainId]?.explorerAPI}
            ?module=account
            &action=tokenbalance
            &contractaddress=${tokenAddress}
            &address=${userAddress}
            &tag=latest
            &apikey=${process.env[`CHAINSCAN_${chainId}_API_KEY`]}`,
               {
                  method: 'GET',
               }
            )
               .then((response) => response.json())
               .then((data) => {
                  console.log(
                     '✅[GET][Token Balance][Base Mainnet]:',
                     data?.result
                  )
                  setBalance(data?.result)
               })
               .catch((error) => console.log('error', error))
         }
      }
      fetchBalance()
   }, [chainId, tokenAddress, userAddress])

   return balance
}
