import { Chains } from "../types/Chains";

export const chains: Chains = {
   10: {
      name: 'Optimism',
      logo: '/chains/optimism.svg',
      explorerAPI: 'https://api-optimistic.etherscan.io/api',
      covalentSlug: 'optimism-mainnet',
   },
   420: {
      name: 'Optimism Goerli',
      logo: '/chains/optimism.svg',
      explorerAPI: 'https://api-goerli-optimistic.etherscan.io/api',
      covalentSlug: 'optimism-goerli'
   },
   8453: {
      name: 'Base',
      logo: '/chains/base.svg',
      explorerAPI: 'https://api.basescan.org/api',
      covalentSlug: 'base-mainnet',
   },
   84531: {
      name: 'Base Goerli Testnet',
      logo: '/chains/base.svg',
      explorerAPI: 'https://api-goerli.basescan.org/api',
      covalentSlug: 'base-testnet',
   },
   7777777: {
      name: 'Zora',
      logo: '/chains/zora.svg',
      covalentSlug: 'zora-mainnet'
   },
}