import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
   ChakraProvider,
   extendTheme,
   Input,
   withDefaultColorScheme,
   Box,
} from '@chakra-ui/react'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'

import Head from 'next/head'
import { AppConfig } from '@/utils/AppConfig'
import Header from '@/components/Header'
import { AccountsContextProvider } from '@/contexts/accountsContext'

import '@/styles/globals.scss'
import { base, baseGoerli, mainnet, optimism, optimismGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'

/*  =====================
   Set up WAGMI
=========================
*/
const { chains, publicClient, webSocketPublicClient, ...a } = configureChains(
   [mainnet, base, baseGoerli, optimismGoerli, optimism],
   [
      // alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || '' }),
      publicProvider(),
   ]
)

const config = createConfig({
   autoConnect: true,
   connectors: [new InjectedConnector({ chains })],
   publicClient,
   webSocketPublicClient,
})

/*  =====================
   Set up Chakra UI
=========================
*/
const theme = extendTheme(
   {
      colors: {
         primary: {
            100: '#CCE1FF',
            200: '#99C3FF',
            300: '#66A5FF',
            400: '#3388FF',
            500: '#0052FF',
            600: '#0047CC',
            700: '#003999',
            800: '#002B66',
            900: '#001E33',
         },
         lightgray: {
            100: '#FAFAFB',
            200: '#F5F6F7',
            300: '#EEEFF2',
            400: '#E2E4E8',
            500: '#CACDD5',
            600: '#B2B7C2',
            700: '#A4A9B6',
            800: '#959CAB',
            900: '#8C93A3',
         },
         darkgray: {
            100: '#747c90',
            200: '#656E85',
            300: '#5C657D',
            400: '#525C76',
            500: '#49536E',
            600: '#3A4662',
            700: '#2C3857',
            800: '#192648',
            900: '#0F1D40',
         },
      },
      shadows: {
         outline: '0 0 0 3px var(--chakra-colors-lightgray-700)',
      },
      components: {
         Button: {
            baseStyle: {
               fontWeight: 'normal',
               border: '1px solid transparent',
               _hover: {
                  // boxShadow: '0px 0px 0px 1px var(--chakra-colors-darkgray-100)',
                  borderColor: 'black',
                  _disabled: {
                     boxShadow: 'none',
                  },
               },
            },
            variants: {
               black: {
                  bg: 'black',
                  color: 'white',
                  _hover: {
                     bg: 'darkgray.900',
                     borderColor: 'black',
                     boxShadow: 'none',
                     _disabled: {
                        bg: 'darkgray.900',
                     },
                  },
               },
               primary: {
                  bg: 'primary.500',
                  color: 'white',
                  _hover: {
                     bg: 'primary.900',
                     borderColor: 'primary',
                     boxShadow: 'none',
                     _disabled: {
                        bg: 'primary.900',
                     },
                  },
               },
               darkgray: {
                  bg: 'darkgray.900',
                  color: 'white',
                  _hover: {
                     bg: 'darkgray.700',
                     borderColor: 'darkgray.900',
                     boxShadow: 'none',
                     _disabled: {
                        bg: 'darkgray.600',
                     },
                  },
               },
               white: {
                  bg: 'white',
                  color: 'darkgray.800',
                  _hover: { bg: 'lightgray.200' },
               },
               outline: {
                  borderColor: 'darkgray.400',
               },
               morePadding: {
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 6,
                  paddingBottom: 6,
               },
            },
         },
      },
   },
   withDefaultColorScheme({ colorScheme: 'gray' })
)

Input.defaultProps = {
   ...Input.defaultProps,
   focusBorderColor: 'lightgray.800',
}

export default function App({ Component, pageProps }: AppProps) {
   const queryClient = new QueryClient()
   return (
      <WagmiConfig config={config}>
         <ChakraProvider theme={theme}>
            <AccountsContextProvider>
               <QueryClientProvider client={queryClient}>
                  <Head>
                     <title>{AppConfig.title}</title>
                     <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                     />
                  </Head>
                  <Box
                     background="lightgray.100"
                     className="custom-scrollbar"
                     flex="1"
                     pos="relative"
                  >
                     <Header />
                     <Component {...pageProps} />
                  </Box>
               </QueryClientProvider>
            </AccountsContextProvider>
         </ChakraProvider>
      </WagmiConfig>
   )
}
