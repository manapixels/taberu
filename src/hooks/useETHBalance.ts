import { chains } from '@/constants/chains'
import { useEffect, useState } from 'react'

export default function useTokenBalance({
   chainId,
   userAddress,
}: {
   chainId?: number
   userAddress?: `0x${string}`
}): number {
   const [balance, setBalance] = useState<number>(0)

   useEffect(() => {
      const fetchBalance = async () => {
         if (
            chainId &&
            userAddress &&
            chains?.[chainId]?.explorerAPI
         ) {
            await fetch(
               `${chains?.[chainId]?.explorerAPI}
               ?module=account
&action=balance
&address=${userAddress}
&tag=latest
&apikey=${process.env[`CHAINSCAN_${chainId}_API_KEY`]}`,
               {
                  method: 'GET',
               }
            )
               .then((response) => response.json())
               .then((data) => {
                  // console.log(
                  //    `✅[GET][Token Balance][${chains[chainId]?.name}]:`,
                  //    data?.result
                  // )
                  setBalance(data?.result)
               })
               .catch((error) => console.log('error', error))
         }
      }
      fetchBalance()
   }, [chainId, userAddress])

   return balance
}
