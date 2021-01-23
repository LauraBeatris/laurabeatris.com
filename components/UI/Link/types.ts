import { PropsWithChildren } from 'react'

export type LinkProps = PropsWithChildren<{
  href: string;
  activeColor?: string;
}>
