import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { Link, Stack, StackProps } from '@chakra-ui/react'

import { Paragraph } from 'components/Base/Paragraph'
import { Heading } from 'components/Base/Heading'
import { Content } from '__generated__/graphql/schema'

type ContentBoxProps = StackProps
  & Pick<Content, 'url' | 'title'>
  & PropsWithChildren<{
    title: string;
    imageSrc: string;
    subtitle: string;
  }>

export function ContentBox ({
  url,
  width,
  title,
  children,
  imageSrc,
  subtitle
}: ContentBoxProps) {
  return (
    <Link href={url} width={width} isExternal>
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
