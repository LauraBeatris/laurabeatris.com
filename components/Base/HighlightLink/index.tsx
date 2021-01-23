import { Link as ChakraLink, LinkProps, useStyleConfig } from '@chakra-ui/react'

import highlightLinkStyles from './styles'

const highlightLinkThemeKey = 'HighlightLink'

function HighlightLink ({
  size,
  variant,
  children,
  ...rest
}: LinkProps) {
  const styles = useStyleConfig(highlightLinkThemeKey, { size, variant })

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

export { HighlightLink, highlightLinkStyles, highlightLinkThemeKey }
