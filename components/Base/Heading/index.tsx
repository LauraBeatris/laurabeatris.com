import { Heading as ChakraHeading, HeadingProps, useColorModeValue, useStyleConfig } from '@chakra-ui/react'

import headingStyles from './styles'

const headingThemeKey = 'Heading'

function Heading ({
  size,
  children,
  ...rest
}: HeadingProps) {
  const variant = useColorModeValue('dark', 'light')
  const styles = useStyleConfig(headingThemeKey, {
    size,
    variant
  })

  return (
    <ChakraHeading
      sx={styles}
      variant={variant}
      {...rest}
    >
      {children}
    </ChakraHeading>
  )
}

export { Heading, headingStyles, headingThemeKey }
