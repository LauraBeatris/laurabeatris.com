import { BoxProps } from '@chakra-ui/react'

export type ProjectProps = BoxProps & {
  name: string;
  imageSrc: string;
  description: string;
  technologies: Array<string>;
}
