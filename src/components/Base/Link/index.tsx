import NextLink from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Link as ChakraLink } from '@chakra-ui/react'

import { LinkProps } from './types'

export function Link ({
  href,
  children,
  ...rest
}: LinkProps) {
  const router = useRouter()

  const isActive = router.pathname === href

  return (
    <NextLink href={href}>
      <ChakraLink
        href={href}
        color={isActive ? 'var(--header-active-link-color)' : 'var(--text-color)'}
        fontWeight={isActive ? 700 : 500}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
