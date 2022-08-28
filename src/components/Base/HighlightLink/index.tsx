import { Link as ChakraLink, LinkProps, useStyleConfig } from '@chakra-ui/react'

import { HIGHLIGHT_LINK_THEME_KEY } from './styles'

export function HighlightLink ({
  size,
  variant,
  children,
  ...rest
}: LinkProps) {
  const styles = useStyleConfig(HIGHLIGHT_LINK_THEME_KEY, { size, variant })

  return (
    <ChakraLink
      sx={styles}
      isExternal
      {...rest}
    >
      {children}
    </ChakraLink>
  )
}
