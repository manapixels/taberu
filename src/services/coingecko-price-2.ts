export const getEthereumPrice = async () => {
   const resp: CoingeckoData = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum`,
      {
         method: 'GET',
      }
   )
      .then((response) => response.json())
      .then((data) => {
         console.log(`✅[GET][Ethereum Price]:`, data?.[0]?.current_price)
         return data
      })
      .catch((error) => console.log('error', error))

   return resp?.[0].current_price
}


type CoingeckoData = Array<{
   id: string
   symbol: string
   name: string
   image: string
   current_price: number
   last_updated: string
}>