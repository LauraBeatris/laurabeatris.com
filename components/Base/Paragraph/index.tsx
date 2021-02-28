import { Text, useStyleConfig } from '@chakra-ui/react'

import { ParagraphProps } from './types'
import { PARAGRAPH_THEME_KEY } from './styles'

export function Paragraph ({
  size,
  variant,
  children,
  ...rest
}: ParagraphProps) {
  const styles = useStyleConfig(PARAGRAPH_THEME_KEY, {
    size,
    variant
  })

  return (
    <Text
      as='p'
      sx={styles}
      {...rest}
    >
      {children}
    </Text>
  )
}
