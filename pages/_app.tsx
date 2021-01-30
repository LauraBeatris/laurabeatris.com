import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import { global } from 'styles/global'
import { configSEO } from 'next-seo.config'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...configSEO} />
      <Global styles={global} />
      <Component {...pageProps} />
    </>
  )
}
