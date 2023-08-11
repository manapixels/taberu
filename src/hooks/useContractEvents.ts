import { chains } from '@/constants/chains'
import { useEffect, useState } from 'react'

export const useContractEvents = (
   contractAddress: string | undefined,
   chainId: number | undefined
) => {
   const [events, setEvents] = useState()

   useEffect(() => {
      let headers = new Headers()
      if (process.env.COVALENT_API_KEY && contractAddress && chainId) {

         headers.set('Authorization', `Bearer ${process.env.COVALENT_API_KEY}`)

         const chainSlug = chains[chainId]?.covalentSlug
         console.log('headers', headers)

         fetch(
            `https://api.covalenthq.com/v1/${chainSlug}/events/address/${contractAddress}/?starting-block=0`,
            { method: 'GET', headers }
         )
            .then((resp) => resp.json())
            .then((data) => {
               console.log(data)
               setEvents(data)
            })
      }
   }, [])

   return {
      events,
   }
}
