import { Heading as ChakraHeading, HeadingProps, useStyleConfig } from '@chakra-ui/react'

import { HEADING_THEME_KEY } from './styles'

export function Heading ({
  size,
  children,
  ...rest
}: HeadingProps) {
  const styles = useStyleConfig(HEADING_THEME_KEY, {
    size
  })

  return (
    <ChakraHeading sx={styles} {...rest}>
      {children}
    </ChakraHeading>
  )
}
