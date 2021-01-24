import { SimpleGrid, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'
import { links } from 'constants/links'
import { getDayOfWeek } from 'utils/getDayOfWeek'
import { Project } from 'components/Project'

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

      <VStack
        width='full'
        spacing={5}
        alignItems='flex-start'
      >
        <Heading as='h2' paddingTop={10}>
          Projects
          <Popover
            popoverText={popoverText}
            buttonContent={<InfoIcon boxSize={5} color='green.400' />}
          />
        </Heading>

        <SimpleGrid
          width='full'
          spacing={4}
          columns={[1, null, 2]}
        >
          <Project
            name='Portfolio'
            imageSrc='/images/florianopolis.jpg'
            technologies={['React', 'Next.js', 'Chakra UI', 'GraphCMS']}
            description='The website that you are seeing right now.'
          />

          <Project
            name='Portfolio'
            imageSrc='/images/florianopolis.jpg'
            technologies={['React', 'Next.js', 'Chakra UI', 'GraphCMS']}
            description='The website that you are seeing right now.'
          />

          <Project
            name='Portfolio'
            imageSrc='/images/florianopolis.jpg'
            technologies={['React', 'Next.js', 'Chakra UI', 'GraphCMS']}
            description='The website that you are seeing right now.'
          />

          <Project
            name='Portfolio'
            imageSrc='/images/florianopolis.jpg'
            technologies={['React', 'Next.js', 'Chakra UI', 'GraphCMS']}
            description='The website that you are seeing right now.'
          />
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}
