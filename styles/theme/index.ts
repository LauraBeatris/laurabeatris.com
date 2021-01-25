import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { fonts } from './fonts'
import { components } from './components'
import { config } from './config'

export const theme = extendTheme({
  config,
  colors,
  fonts,
  global: {
    body: {
      bg: 'var(--bg-color)',
      color: 'var(--text-color)'
    }
  },
  components
})
