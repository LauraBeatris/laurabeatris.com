import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { theme } from 'styles/theme'
import { global } from 'styles/global'
import { configSEO } from 'next-seo.config'
import { Layout } from 'components/Layout'
import useHasMounted from 'hooks/useHasMounted'

export default function MyApp ({ Component, pageProps }: AppProps) {
  // Temporary solution to avoid showing color mode after hydration process
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  return (
    <>
      <DefaultSeo {...configSEO} />
      <Global styles={global} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
