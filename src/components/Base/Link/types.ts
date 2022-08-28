import { PropsWithChildren } from 'react'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'

export type LinkProps = ChakraLinkProps & PropsWithChildren<{
  href: string;
}>
