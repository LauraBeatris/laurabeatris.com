import { StackProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export type ContentBoxProps = StackProps & PropsWithChildren<{
  title: string;
  imageSrc: string;
  subtitle: string;
}>
