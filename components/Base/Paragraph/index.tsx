import { Text, TextProps, useStyleConfig } from '@chakra-ui/react'

import paragraphStyles from './styles'

const paragraphThemeKey = 'Paragraph'

function Paragraph ({
  size,
  variant,
  children,
  ...rest
}: TextProps) {
  const styles = useStyleConfig(paragraphThemeKey, { size, variant })

  return (<Text as='p' sx={styles} {...rest}>{children}</Text>)
}

export { Paragraph, paragraphStyles, paragraphThemeKey }
