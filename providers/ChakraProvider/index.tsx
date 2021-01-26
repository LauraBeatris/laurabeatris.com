import {
  ChakraProvider as OriginalChakraProvider,
  cookieStorageManager,
  localStorageManager
} from '@chakra-ui/react'

import { theme } from 'styles/theme'
import { Layout } from 'components/Layout'

/**
 * Custom ChakraProvider to use cookieStorageManager for SSR
 * and avoid color mode flashes
 */
export function ChakraProvider ({ cookies, children }) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <OriginalChakraProvider
      resetCSS
      theme={theme}
      colorModeManager={colorModeManager}
    >
      <Layout>

        {children}
      </Layout>

    </OriginalChakraProvider>
  )
}
