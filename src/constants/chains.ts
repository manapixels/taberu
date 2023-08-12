import { Chains } from "../types/Chains";

export const chains: Chains = {
   10: {
      name: 'Optimism',
      logo: '/chains/optimism.svg',
      explorerAPI: 'https://api-optimistic.etherscan.io/api',
      explorerURL: 'https://optimistic.etherscan.io/',
      covalentSlug: 'optimism-mainnet',
      loyaltyContract: '0xEa22183a52160E7F85dE8a8572F09E6ED15eDE57',
   },
   420: {
      name: 'Optimism Goerli',
      logo: '/chains/optimism.svg',
      explorerAPI: 'https://api-goerli-optimistic.etherscan.io/api',
      explorerURL: 'https://goerli-optimistic.etherscan.io/',
      covalentSlug: 'optimism-goerli',
      loyaltyContract: '0x46F7C968DB24bEfB129B9904270a1b2f8f479519',
   },
   8453: {
      name: 'Base',
      logo: '/chains/base.svg',
      explorerAPI: 'https://api.basescan.org/api',
      explorerURL: 'https://basescan.org/',
      covalentSlug: 'base-mainnet',
      loyaltyContract: '0x2924C71b684fe81c7913B6296b4Bb8ccd72d44D3',
   },
   84531: {
      name: 'Base Goerli Testnet',
      logo: '/chains/base.svg',
      explorerAPI: 'https://api-goerli.basescan.org/api',
      explorerURL: 'https://goerli.basescan.org/',
      covalentSlug: 'base-testnet',
      loyaltyContract: '0x1626469daF0D349a268b32f37bdAFf36F5A5209A',
   },
   // 7777777: {
   //    name: 'Zora',
   //    logo: '/chains/zora.svg',
   //    covalentSlug: 'zora-mainnet',
   // },
}