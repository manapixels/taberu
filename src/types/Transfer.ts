export interface Transfer {
   from: string
   to: string
   transactionHash: string
   timestamp: string
   amount: string
   tokenAddress: string
   type: string
   fields: null
   token: {
      l2Address: string
      l1Address: string
      symbol: string
      name: string
      decimals: number
      price: number
   }
}
