import { AppConfig } from '@/utils/AppConfig'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
     <Html lang="en">
        <Head>
           {/* HTML Meta Tags */}
           <meta name="description" content={AppConfig.description} />
           <link rel="icon" href="/favicon.ico" />

           {/* Facebook Meta Tags */}
           <meta property="og:url" content={AppConfig.url} />
           <meta name="og:type" content={AppConfig.type} />
           <meta property="og:title" content={AppConfig.title} />
           <meta name="og:description" content={AppConfig.description} />
           <meta property="og:image" content="/cover.png" />

           {/* Twitter Meta Tags */}
           <meta name="twitter:card" content="summary_large_image" />
           <meta property="twitter:domain" content={AppConfig.url} />
           <meta property="twitter:url" content={AppConfig.url} />
           <meta name="twitter:title" content={AppConfig.title} />
           <meta name="twitter:description" content={AppConfig.description} />
           <meta name="twitter:image" content="/cover.png" />
        </Head>
        <body>
           <Main />
           <NextScript />
        </body>
     </Html>
  )
}
