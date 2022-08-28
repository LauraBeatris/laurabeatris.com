import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeToggleProvider } from '@laurabeatris/chakra-ui-flashless'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Layout } from 'components/Layout'
import { configSEO } from 'config/SEO'
import { colorModeVariables } from 'styles/theme/colorModeVariables'
import { theme } from 'styles/theme'
import { global } from 'styles/global'

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
