import { StackProps } from '@chakra-ui/react'

export type PlaceImageProps = StackProps & {
  name: string;
  endYear?: number;
  imageSrc: string;
  startYear: number;
}
