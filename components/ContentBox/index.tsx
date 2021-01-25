import Image from 'next/image'
import { Link, Stack } from '@chakra-ui/react'

import { Paragraph } from 'components/Base/Paragraph'
import { Heading } from 'components/Base/Heading'

import { ContentBoxProps } from './types'

export function ContentBox ({
  url,
  title,
  children,
  imageSrc,
  subtitle
}: ContentBoxProps) {
  return (
    <Link href={url} isExternal>
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
          {
            subtitle
              ? <Paragraph size='sm' as='span'>{subtitle}</Paragraph>
              : null
          }

          <Heading size='xs'>{title}</Heading>

          {children}
        </Stack>
      </Stack>
    </Link>
  )
}
