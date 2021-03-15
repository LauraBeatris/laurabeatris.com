import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeToggleProvider } from '@laurabeatris/chakra-ui-flashless'
import { QueryClient, QueryClientProvider } from 'react-query'

import { global } from 'styles/global'
import { configSEO } from 'next-seo.config'
import { theme } from 'styles/theme'
import { Layout } from 'components/Layout'
import { colorModeVariables } from 'styles/theme/colorModeVariables'

const queryClient = new QueryClient()

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...configSEO} />
      <Global styles={global} />
      <ChakraProvider
        resetCSS
        theme={theme}
      >
        <ColorModeToggleProvider
          theme={theme}
          customVariables={colorModeVariables}
        >
          <Layout>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </Layout>
        </ColorModeToggleProvider>
      </ChakraProvider>
    </>
  )
}
