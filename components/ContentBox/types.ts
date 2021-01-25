import { StackProps } from '@chakra-ui/react'

import { PropsWithChildren } from 'react'

import { Content } from 'graphql/schema'

export type ContentBoxProps = StackProps
  & Omit<Content, 'id' | 'image'>
  & PropsWithChildren<{
    title: string;
    imageSrc: string;
    subtitle: string;
  }>
