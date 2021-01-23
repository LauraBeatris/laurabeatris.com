import { Heading as ChakraHeading, HeadingProps, useStyleConfig } from '@chakra-ui/react'

import headingStyles from './styles'

const headingThemeKey = 'Heading'

function Heading ({
  size,
  variant,
  children,
  ...rest
}: HeadingProps) {
  const styles = useStyleConfig(headingThemeKey, { size, variant })

  return (<ChakraHeading sx={styles} {...rest}>{children}</ChakraHeading>)
}

export { Heading, headingStyles, headingThemeKey }
