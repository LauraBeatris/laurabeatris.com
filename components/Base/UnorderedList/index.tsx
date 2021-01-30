import { UnorderedList as ChakraUnorderedList, useColorModeValue, useStyleConfig } from '@chakra-ui/react'

import { unorderedListStyles, UNORDERED_LIST_THEME_KEY } from './styles'

function UnorderedList ({ children, ...rest }) {
  const variant = useColorModeValue('dark', 'light')
  const styles = useStyleConfig(UNORDERED_LIST_THEME_KEY, {
    variant
  })

  return (
    <ChakraUnorderedList sx={styles} {...rest}>
      {children}
    </ChakraUnorderedList>
  )
}

export { UnorderedList, unorderedListStyles, UNORDERED_LIST_THEME_KEY }
