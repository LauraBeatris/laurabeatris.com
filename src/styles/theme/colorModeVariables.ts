import hexToRgba from 'hex-to-rgba'
import { Types } from '@laurabeatris/chakra-ui-flashless'

import { colors } from './colors'

export const colorModeVariables: Types.Variables = {
  // '--variable-name': [lightVariant, [darkVariant, 0.5]]
  '--app-background-color': [colors.white['100'], colors.dark],
  '--header-background-color': [
    hexToRgba(colors.white[100], 0.5),
    hexToRgba(colors.dark, 0.5)
  ],
  '--text-color': [colors.dark, colors.white['100']],
  '--popover-color': [colors.white['100'], colors.dark],
  '--popover-background-color': [colors.dark, colors.white['100']],
  '--gray-paragraph-variant-color': [colors.gray['300'], colors.white['100']],
  '--header-active-link-color': [colors.dark, colors.green['400']],
  '--header-mobile-menu-color': [colors.white['100'], colors.dark],
  '--project-filters-background-color': [colors.dark, colors.white['100']],
  '--project-filters-color': [colors.white['100'], colors.dark],
  '--date-selector-background-color': [colors.white['100'], colors.dark]
}
