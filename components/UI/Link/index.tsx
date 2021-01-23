import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Link as ChakraLink } from '@chakra-ui/react'

import { LinkProps } from './types'

export function Link ({ href, children, activeColor = 'dark' }: LinkProps) {
  const router = useRouter()

  const isActive = router.pathname === href

  return (
    <NextLink href={href}>
      <ChakraLink
        color={isActive ? activeColor : 'dark'}
        fontWeight={isActive ? 700 : 500}
        letterSpacing={0.5}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
