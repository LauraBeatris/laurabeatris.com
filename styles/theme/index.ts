import { extendTheme } from '@chakra-ui/react'
import { flashless } from '@laurabeatris/chakra-ui-flashless'

import { colors } from './colors'
import { fonts } from './fonts'
import { components } from './components'
import { config } from './config'

export const theme = extendTheme(flashless({
  config,
  colors,
  fonts,
  components
}))
