import { BoxProps } from '@chakra-ui/react'

export type ProjectProps = BoxProps & {
  title: string;
  liveUrl: string;
  githubUrl: string;
  description: string;
  mainImageUrl: string;
  stack: {
    id: string;
    language: string;
    framework: string;
    libraries: Array<string>;
    categories: Array<string>
  };
}
