import Image from 'next/image'
import { StackProps, Text, Stack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'

type ImageWithCaptionsProps = StackProps & {
  imageSrc: string;
  subCaption: string;
  mainCaption: string;
}

export function ImageWithCaptions ({
  imageSrc,
  subCaption,
  mainCaption,
  ...rest
}: ImageWithCaptionsProps) {
  return (
    <Stack direction='column' spacing={4} {...rest}>
      <Image
        src={imageSrc}
        alt={mainCaption}
        width={734}
        height={300}
        quality={100}
        className='next-image'
      />

      <Stack spacing={0.5} direction='column'>
        <Heading size='xs' as='strong'>
          {mainCaption}
        </Heading>
        <Text as='small' color='gray.300'>
          {subCaption}
        </Text>
      </Stack>
    </Stack>
  )
}
