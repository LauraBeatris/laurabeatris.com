import { Text, useStyleConfig, TextProps } from '@chakra-ui/react'

import { PARAGRAPH_THEME_KEY } from './styles'

type ParagraphProps = TextProps & {
  useColorModeVariant?: boolean;
}

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
