import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { fonts } from './fonts'
import { components } from './components'
import { config } from './config'
import { styles } from './styles'

export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components
})
