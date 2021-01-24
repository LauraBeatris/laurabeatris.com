import NextLink from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Link as ChakraLink } from '@chakra-ui/react'

import { LinkProps } from './types'

export function Link ({
  href,
  children,
  activeColor = 'dark',
  ...rest
}: LinkProps) {
  const router = useRouter()

  const isActive = router.pathname === href

  return (
    <NextLink href={href}>
      <ChakraLink
        href={href}
        color={isActive ? activeColor : 'dark'}
        fontWeight={isActive ? 700 : 500}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
