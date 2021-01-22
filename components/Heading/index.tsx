import { Heading as ChakraHeading, HeadingProps, useStyleConfig } from '@chakra-ui/react'

export function Heading ({
  size,
  variant,
  children,
  ...rest
}: HeadingProps) {
  const styles = useStyleConfig('Heading', { size, variant })

  return (<ChakraHeading sx={styles} {...rest}>{children}</ChakraHeading>)
}
