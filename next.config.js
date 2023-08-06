/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/accounts',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
