import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'

import { theme } from 'styles/theme'
import { global } from 'styles/global'
import { configSEO } from 'next-seo.config'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...configSEO} />
      <ChakraProvider theme={theme} resetCSS>
        <Global styles={global} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
