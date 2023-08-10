export const getEthereumPrice = () => {
   const resp = fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=eth`,
      {
         method: 'GET',
         // @ts-ignore
         headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
         },
         mode: 'cors'
      }
   )
      .then((response) => response.json())
      .then((data) => {
         console.log(`✅[GET][Ethereum Price]:`, data)
         return data
      })
      .catch((error) => console.log('error', error))

   return resp
}
