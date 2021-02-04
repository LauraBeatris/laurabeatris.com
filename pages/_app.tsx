import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { global } from 'styles/global'
import { configSEO } from 'next-seo.config'
import { theme } from 'styles/theme'
import { Layout } from 'components/Layout'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...configSEO} />
      <Global styles={global} />
      <ChakraProvider
        resetCSS
        theme={theme}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}
