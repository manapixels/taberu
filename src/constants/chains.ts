import { Chains } from "../types/Chains";

export const chains: Chains = {
   10: {
      name: 'Optimism',
      logo: '/chains/optimism.svg',
      explorerAPI: 'https://api-optimistic.etherscan.io/api',
   },
   8453: {
      name: 'Base',
      logo: '/chains/base.svg',
      explorerAPI: 'https://api.basescan.org/api',
   },
   84531: {
      name: 'Base Goerli Testnet',
      logo: '/chains/base.svg',
      explorerAPI: 'https://api-goerli.basescan.org/api',
   },
   7777777: {
      name: 'Zora',
      logo: '/chains/zora.svg',
   },
}