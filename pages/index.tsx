import { VStack, Heading } from '@chakra-ui/react'
import { HighlightLink } from 'components/Base/HighlightLink'
import { Paragraph } from 'components/Base/Paragraph'
import { links } from 'constants/links'
import { getDayOfWeek } from 'utils/getDayOfWeek'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())

export default function Home () {
  return (
    <VStack
      width='full'
      paddingY={10}
      alignItems={['center', 'flex-start']}
    >
      <Heading
        as='h1'
        maxWidth={['100%', '70%']}
        textAlign={['center']}
      >
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
    </VStack>
  )
}
