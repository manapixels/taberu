export type Chains = {
   [key: number]: Chain
}

export type Chain = {
   name: string
   logo: string
   explorerAPI?: string
   explorerURL?: string
   covalentSlug?: string
   loyaltyContract?: string
}
