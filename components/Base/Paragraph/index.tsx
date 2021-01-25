import { Text, useColorModeValue, useStyleConfig } from '@chakra-ui/react'

import paragraphStyles from './styles'
import { ParagraphProps } from './types'

const paragraphThemeKey = 'Paragraph'

function Paragraph ({
  size,
  children,
  useColorModeVariant = true,
  ...rest
}: ParagraphProps) {
  const variant = useColorModeValue('dark', 'light')
  const styles = useStyleConfig(paragraphThemeKey, {
    size,
    variant: useColorModeVariant ? variant : rest.variant
  })

  return (
    <Text
      as='p'
      sx={styles}
      variant={variant}
      {...rest}
    >{children}
    </Text>
  )
}

export { Paragraph, paragraphStyles, paragraphThemeKey }
