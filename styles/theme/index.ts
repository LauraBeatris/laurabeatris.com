import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { fonts } from './fonts'
import { components } from './components'

export const theme = extendTheme({ colors, fonts, components })
