const BASESCAN_API_URL = 'https://api.basescan.org/api?module=account'

const getTokenBalance = async (
   chain: number,
   contractAddress: string,
   userAddress: string
) => {
   // [Base][Mainnet]
   if (chain === 8453) {
      const response = await fetch(
         `${BASESCAN_API_URL}&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${process.env.BASESCAN_API_KEY}`,
         {
            method: 'GET',
         }
      )
         .then((response) => response.json())
         .then((data) => {
            console.log('✅[GET][Token Balance][Base Mainnet]:', data)
            return data
         })
         .catch((error) => console.log('error', error))
      return response
   } 
   // [Base Goerl][Testnet]
   else if (chain === 84531) {
      
   }
}
