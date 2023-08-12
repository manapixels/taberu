import { chains } from '@/constants/chains'
import { CovalentTransaction } from '@/types/covalent/Transaction'
import { useEffect, useState } from 'react'

export const useRecentTransactions = (
   userAddress: string | undefined,
   contractAddress: string | undefined,
   chainId: number | undefined
) => {
   const [txns, setTxns] = useState<CovalentTransaction[]>()

   const fetchTxns = () => {
      if (process.env.COVALENT_API_KEY && contractAddress && chainId) {
         let headers = new Headers()
         headers.set('Authorization', `Bearer ${process.env.COVALENT_API_KEY}`)

         const chainSlug = chains[chainId]?.covalentSlug

         fetch(
            `https://api.covalenthq.com/v1/${chainSlug}/address/${userAddress}/transactions_v3/?`,
            { method: 'GET', headers }
         )
            .then((resp) => resp.json())
            .then((data) => {
               // console.log(
               //    'txns',
               //    data?.data?.items,
               //    process.env.BASE_GOERLI_LOYALTYPROGRAM_STARBUCKS,
               //    data?.data?.items.filter(
               //       (i: any) =>
               //          i?.log_events?.length > 0 &&
               //          i?.to_address ===
               //             process.env.BASE_GOERLI_LOYALTYPROGRAM_STARBUCKS?.toLowerCase()
               //    )
               // )
               setTxns(
                  data?.data?.items.filter(
                     (i: any) =>
                        i?.log_events?.length > 0 &&
                        i?.to_address ===
                           process.env.BASE_GOERLI_LOYALTYPROGRAM_STARBUCKS?.toLowerCase()
                  )
               )
            })
      }
   }

   useEffect(() => {
      fetchTxns()
   }, [])

   return {
      txns,
      fetchTxns
   }
}
