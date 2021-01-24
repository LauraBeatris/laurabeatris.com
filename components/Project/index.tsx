import { Badge, Image, Stack } from '@chakra-ui/react'

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
      direction={['column']}
      spacing={5}
      padding={5}
      alignItems='center'
      borderRadius='md'
      borderWidth={0.5}
      {...rest}
    >
      <Image
        alt={name}
        src={imageSrc}
        width='full'
        borderRadius='md'
      />

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

          <Stack direction='row' spacing={1}>
            {technologies.map((technology) => (
              <Badge
                key={technology}
                variant='subtle'
                colorScheme='green'
              >
                {technology}
              </Badge>
            ))}
          </Stack>
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
