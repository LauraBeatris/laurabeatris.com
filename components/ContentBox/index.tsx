import Image from 'next/image'
import { Stack } from '@chakra-ui/react'

import { Paragraph } from 'components/Paragraph'

import { ContentBoxProps } from './types'
import { Heading } from 'components/Heading'

export function ContentBox ({
  title,
  children,
  imageSrc,
  subtitle
}: ContentBoxProps) {
  return (
    <Stack direction='column' spacing={3}>
      <Image
        src={imageSrc}
        alt={title}
        width={331}
        height={152}
        quality={100}
        className='next-image'
      />

      <Stack direction='column' spacing={1}>
        <Paragraph size='sm' as='span'>{subtitle}</Paragraph>

        <Heading size='xs'>{title}</Heading>

        {children}
      </Stack>
    </Stack>
  )
}
