import { StackProps } from '@chakra-ui/react'

export type ImageWithCaptionsProps = StackProps & {
  imageSrc: string;
  subCaption: string;
  mainCaption: string;
}
