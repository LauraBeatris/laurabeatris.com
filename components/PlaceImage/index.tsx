import Image from 'next/image'
import { Box, Text, Stack } from '@chakra-ui/react'

import { PlaceImageProps } from './types'
import { Heading } from 'components/Heading'

export function PlaceImage ({
  name,
  endYear,
  imageSrc,
  startYear,
  ...rest
}: PlaceImageProps) {
  return (
    <Stack direction='column' spacing={4} {...rest}>
      <style jsx global>{`
          .place-image {
            border-radius: 4px;
            object-fit: cover;
          }
        `}
      </style>
      <Box
        width={734}
        height={300}
        maxWidth='full'
        position='relative'
        borderRadius='md'
      >
        <Image
          src={imageSrc}
          alt={`Picture of ${name} city`}
          layout='fill'
          quality={100}
          className='place-image'
        />
      </Box>

      <Stack spacing={0.5} direction='column'>
        <Heading size='xs' as='strong'>
          {name}
        </Heading>
        <Text as='small' color='gray.300'>
          {startYear} - {endYear ?? 'Present'}
        </Text>
      </Stack>
    </Stack>
  )
}
