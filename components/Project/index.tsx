import { Wrap, Flex, Badge, Stack, WrapItem } from '@chakra-ui/react'
import Image from 'next/image'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'

import { ProjectProps } from './types'

export function Project ({
  name,
  imageSrc,
  description,
  technologies,
  ...rest
}: ProjectProps) {
  return (
    <Stack
      direction='column'
      spacing={5}
      padding={5}
      alignItems='center'
      borderRadius='md'
      borderWidth={0.5}
      {...rest}
    >
      <Flex
        height={152}
        width='full'
        position='relative'
        borderRadius='md'
      >
        <Image
          alt={name}
          src={imageSrc}
          layout='fill'
          className='next-image'
        />
      </Flex>

      <Stack
        width='full'
        spacing={2}
        direction='column'
        alignItems='start'
        justifyContent='space-between'
      >
        <Stack
          width='full'
          spacing={1}
          direction='column'
          alignItems='start'
        >
          <Heading as='strong' size='xs'>{name}</Heading>

          <Wrap spacing={1}>
            {technologies.map((technology) => (
              <WrapItem key={technology}>
                <Badge variant='subtle' colorScheme='green'>
                  {technology}
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>

        <Paragraph
          size='sm'
          variant='regular'
        >
          {description}
        </Paragraph>
      </Stack>
    </Stack>
  )
}
