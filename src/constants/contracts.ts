export type ContractsType = {
   [key: number]: {
      name: string
      logo?: string
      USDC?: string
      USDC2?: string
      USDT?: string
      DAI?: string
   }
}

export const contracts: ContractsType = {
   // 5: {
   //    // https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/USDC/data.json
   //    name: 'Ethereum Goerli',
   //    logo: '/chains/ethereum.svg',
   //    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
   //    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
   //    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
   // },
   10: {
      // https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/USDC/data.json
      name: 'Optimism',
      logo: '/chains/optimism.svg',
      USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
      USDC: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
      DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
   },
   420: {
      name: 'Optimism Goerli',
      logo: '/chains/optimism.svg',
      USDT: '0x853eb4bA5D0Ba2B77a0A5329Fd2110d5CE149ECE',
      USDC: '0x7E07E15D2a87A24492740D16f5bdF58c16db0c4E',
      DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
   },
   8453: {
      name: 'Base',
      logo: '/chains/base.svg',
      USDC: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
      DAI: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
   },
   84531: {
      name: 'Base Goerli Testnet',
      logo: '/chains/base.svg',
      USDT: '0x6440c59d7c7c108d3bb90e4bdeee8262c975858a',
      USDC: '0x853154e2A5604E5C74a2546E2871Ad44932eB92C',
      //   USDC: '0xb37a5498a6386b253fc30863a41175c3f9c0723b',
      //   USDC: '0x2e9f75df8839ff192da27e977cd154fd1eae03cf',
      DAI: '0x174956bDfbCEb6e53089297cce4fE2825E58d92C',
   },
   7777777: {
      name: 'Zora',
      logo: '/chains/zora.svg',
   },
}
