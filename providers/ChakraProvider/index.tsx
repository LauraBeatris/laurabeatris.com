import {
  ChakraProvider as OriginalChakraProvider,
  cookieStorageManager,
  localStorageManager
} from '@chakra-ui/react'

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
    <OriginalChakraProvider colorModeManager={colorModeManager}>
      {children}
    </OriginalChakraProvider>
  )
}
