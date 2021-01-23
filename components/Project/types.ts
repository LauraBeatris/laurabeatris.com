import { BoxProps } from '@chakra-ui/react'

// TODO - Use codegen to generate types from GraphCMS models
export type ProjectProps = BoxProps & {
  name: string;
  imageUrl: string;
  description: string;
  technologies: Array<string>;
}
