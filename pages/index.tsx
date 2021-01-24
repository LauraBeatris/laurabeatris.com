import {
  VStack,
  Popover,
  Button,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'
import { links } from 'constants/links'
import { getDayOfWeek } from 'utils/getDayOfWeek'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())
const popoverText = 'Click on the projects to see more details about it'

export default function Home () {
  return (
    <VStack
      width='full'
      paddingY={10}
      alignItems='flex-start'
    >
      <Heading as='h1'>
        Happy {dayOfWeek}!
        <br />
        I'm Laura Beatris
      </Heading>

      <Paragraph variant='regular'>
        I'm a Software Engineer and Content Creator.
        I run a <HighlightLink href={links.youtube}>Youtube Channel</HighlightLink>{' '}
        and a <HighlightLink href={links.podcast}>Podcast</HighlightLink> about programming.
        Teaching and creating solutions are my favorite things in the world. <span role='img' aria-hidden='true'>🚀</span>
      </Paragraph>

      <Heading as='h2' paddingTop={10}>
        Projects
        <Popover aria-label={popoverText} placement='top'>
          <PopoverTrigger>
            <Button
              height='unset'
              variant='unstyled'
              minWidth='unset'
              marginLeft={2}
            >
              <InfoIcon boxSize={5} color='green.400' />
            </Button>
          </PopoverTrigger>
          <PopoverContent backgroundColor='dark'>
            <PopoverArrow backgroundColor='dark' />
            <PopoverCloseButton color='white.100' />
            <PopoverBody>
              <Paragraph variant='white' size='sm'>
                {popoverText}
              </Paragraph>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Heading>
    </VStack>
  )
}
