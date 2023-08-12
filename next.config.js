/** @type {import('next').NextConfig} */

const nextConfig = {
   reactStrictMode: true,
   env: {
      ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
      COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
      CHAINSCAN_8453_API_KEY: process.env.CHAINSCAN_8453_API_KEY,
      CHAINSCAN_84531_API_KEY: process.env.CHAINSCAN_84531_API_KEY,
      CHAINSCAN_10_API_KEY: process.env.CHAINSCAN_10_API_KEY,
      CHAINSCAN_420_API_KEY: process.env.CHAINSCAN_420_API_KEY,
      COVALENT_API_KEY: process.env.COVALENT_API_KEY
   },
   async redirects() {
     return [
       {
         source: '/',
         destination: '/stores/starbucks',
         permanent: false
       }
     ]
   }
}

module.exports = nextConfig
