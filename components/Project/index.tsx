import {
  Wrap,
  Flex,
  Link,
  Badge,
  Stack,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import { AiFillGithub, AiOutlineLink } from 'react-icons/ai'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'

import { ProjectProps } from './types'
import { ProjectDetailsModal } from './ProjectDetailsModal'

export function Project ({
  stack,
  title,
  liveUrl,
  githubUrl,
  description,
  mainImageUrl,
  ...rest
}: ProjectProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { categories } = stack

  return (
    <>
      <ProjectDetailsModal
        title={title}
        stack={stack}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Stack
        as='button'
        onClick={onOpen}
        spacing={5}
        padding={5}
        direction='column'
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
            alt={title}
            src={mainImageUrl}
            layout='fill'
            className='next-image next-image---contained'
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
            <Stack direction='row' alignItems='center'>
              <Heading as='strong' size='xs'>
                {title}
              </Heading>

              {
                githubUrl
                  ? (
                    <Link href={githubUrl} isExternal>
                      <AiFillGithub>{githubUrl}</AiFillGithub>
                    </Link>
                    )
                  : null
              }

              {
                liveUrl
                  ? (
                    <Link href={liveUrl} isExternal>
                      <AiOutlineLink>{liveUrl}</AiOutlineLink>
                    </Link>
                    )
                  : null
              }
            </Stack>

            <Wrap spacing={1} marginBottom='auto'>
              {
                categories.map((technology) => (
                  <WrapItem key={technology}>
                    <Badge variant='subtle' colorScheme='green'>
                      {technology}
                    </Badge>
                  </WrapItem>
                ))
              }
            </Wrap>
          </Stack>

          <Paragraph
            size='sm'
            variant='regular'
            textAlign='left'
          >
            {description}
          </Paragraph>
        </Stack>
      </Stack>
    </>
  )
}
