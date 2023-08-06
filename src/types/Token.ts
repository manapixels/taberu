export interface Token {
   price: number | undefined
   balance: number
   contractAddress: string
   decimals: number
   name: string
   symbol: string
   type: string
   totalSupply?: string
   icon_url?: string
   holders?: string
}
