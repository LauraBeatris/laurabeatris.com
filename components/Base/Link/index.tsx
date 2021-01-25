import NextLink from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'

import { LinkProps } from './types'

export function Link ({
  href,
  children,
  activeColor,
  ...rest
}: LinkProps) {
  const router = useRouter()

  const color = useColorModeValue(
    'dark',
    'white.100'
  )

  const colorModeActiveColor = useColorModeValue(
    activeColor ?? 'dark',
    'green.400'
  )

  const isActive = router.pathname === href

  return (
    <NextLink href={href}>
      <ChakraLink
        href={href}
        color={isActive ? colorModeActiveColor : color}
        fontWeight={isActive ? 700 : 500}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
