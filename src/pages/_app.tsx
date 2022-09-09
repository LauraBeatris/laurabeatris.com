import { ReactNode } from 'react'
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

type ConditionalWrapperProps = {
  wrapper: (children: ReactNode) => JSX.Element;
  condition: boolean;
  children: JSX.Element;
}

/**
 * Contains the name of page components that shouldn't be a children of Layout
 */
const PAGE_LAYOUT_BLACK_LIST = ['LearningJournalEntry']
const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) =>
  condition ? wrapper(children) : children

export default function MyApp ({ Component, pageProps }: AppProps) {
  const shouldRenderLayout = !PAGE_LAYOUT_BLACK_LIST.includes(Component.name)

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
          <ConditionalWrapper
            wrapper={(children) => <Layout>{children}</Layout>}
            condition={shouldRenderLayout}
          >
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </ConditionalWrapper>
        </ColorModeToggleProvider>
      </ChakraProvider>
    </>
  )
}
