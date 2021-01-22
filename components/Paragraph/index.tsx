import { Text, TextProps, useStyleConfig } from '@chakra-ui/react'

export function Paragraph ({
  size,
  variant,
  children,
  ...rest
}: TextProps) {
  const styles = useStyleConfig('Paragraph', { size, variant })

  return (<Text sx={styles} {...rest}>{children}</Text>)
}
