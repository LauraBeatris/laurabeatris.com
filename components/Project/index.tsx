import { Badge, Image, Stack } from '@chakra-ui/react'

import { Heading } from 'components/UI/Heading'
import { Paragraph } from 'components/UI/Paragraph'

import { ProjectProps } from './types'

export function Project ({
  name,
  imageUrl,
  description,
  technologies,
  ...rest
}: ProjectProps) {
  return (
    <Stack
      direction={['column', 'row']}
      spacing={5}
      padding={5}
      alignItems='center'
      borderRadius='md'
      borderWidth={0.5}
      {...rest}
    >
      <Image
        alt={name}
        src={imageUrl}
        width={131}
        height={83}
        borderRadius='md'
      />

      <Stack
        spacing={2}
        direction='column'
        alignItems='start'
        justifyContent='space-between'
      >
        <Stack
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
