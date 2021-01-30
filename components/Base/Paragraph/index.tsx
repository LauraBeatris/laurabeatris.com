import { Text, useColorModeValue, useStyleConfig } from '@chakra-ui/react'

import { ParagraphProps } from './types'
import { PARAGRAPH_THEME_KEY } from './styles'

export function Paragraph ({
  size,
  children,
  useColorModeVariant = true,
  ...rest
}: ParagraphProps) {
  const variant = useColorModeValue('dark', 'light')
  const styles = useStyleConfig(PARAGRAPH_THEME_KEY, {
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
