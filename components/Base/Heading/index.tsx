import { Heading as ChakraHeading, HeadingProps, useColorModeValue, useStyleConfig } from '@chakra-ui/react'

import { HEADING_THEME_KEY } from './styles'

export function Heading ({
  size,
  children,
  ...rest
}: HeadingProps) {
  const variant = useColorModeValue('dark', 'light')
  const styles = useStyleConfig(HEADING_THEME_KEY, {
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
