import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'

import { theme } from 'styles/theme'
import { global } from 'styles/global'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Global styles={global} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
