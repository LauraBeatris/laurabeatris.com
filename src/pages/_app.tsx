import { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeToggleProvider } from '@laurabeatris/chakra-ui-flashless'

import { Layout } from 'components/Layout'
import { configSEO } from 'config/SEO'
import { colorModeVariables } from 'styles/theme/colorModeVariables'
import { theme } from 'styles/theme'
import { global } from 'styles/global'

import LearningJournalEntry from './learning-journal/[id]'

type ConditionalWrapperProps = {
  wrapper: (children: ReactNode) => JSX.Element;
  condition: boolean;
  children: JSX.Element;
}

/**
 * Contains the name of page components that shouldn't be a children of Layout
 */
const PAGE_LAYOUT_BLACK_LIST = [LearningJournalEntry.name]
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
            <Component {...pageProps} />
          </ConditionalWrapper>
        </ColorModeToggleProvider>
      </ChakraProvider>
    </>
  )
}
