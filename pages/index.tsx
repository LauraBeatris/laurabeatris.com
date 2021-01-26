import { InferGetServerSidePropsType } from 'next'
import { VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'
import { ProjectsList } from 'components/ProjectsList'
import { Timeline } from 'components/Timeline'
import { links } from 'constants/links'
import { getDayOfWeek } from 'utils/getDayOfWeek'
import { getProjects } from 'graphql/queries/getProjects'
import { getTimelineList } from 'graphql/queries/getTimelineList'
import { ChakraProvider } from 'providers/ChakraProvider'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())

export async function getServerSideProps ({ req }) {
  try {
    const projects = await getProjects()
    const timelineList = await getTimelineList()

    return {
      props: {
        projects,
        timelineList,
        cookies: req.headers.cookie ?? ''
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return {
      props: {}
    }
  }
}

export default function Home ({
  projects,
  cookies,
  timelineList
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ChakraProvider cookies={cookies}>
      <VStack
        width='full'
        paddingTop={5}
        paddingBottom={10}
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

        <ProjectsList projects={projects} />
        <Timeline timelineList={timelineList} />
      </VStack>
    </ChakraProvider>
  )
}
