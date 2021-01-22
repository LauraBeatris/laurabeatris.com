import { Flex, Container, ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { theme } from 'styles/theme'
import { global } from 'styles/global'
import { configSEO } from 'next-seo.config'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...configSEO} />
      <ChakraProvider theme={theme} resetCSS>
        <Flex minHeight='100vh' backgroundColor='white.100'>
          <Container
            as='main'
            maxW='3xl'
            padding={8}
          >
            <Global styles={global} />
            <Component {...pageProps} />
          </Container>
        </Flex>
      </ChakraProvider>
    </>
  )
}
