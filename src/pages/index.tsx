import { InferGetServerSidePropsType } from 'next'
import { Text, VStack } from '@chakra-ui/react'

import { ArrowRightIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'
import { ProjectsList } from 'components/ProjectsList'
import { Timeline } from 'components/Timeline'
import { links } from 'constants/links'
import { getDayOfWeek } from 'utils/getDayOfWeek'
import { getTimelineList } from 'graphql/queries/getTimelineList'
import { getStack } from 'graphql/queries/getStack'
import { getProjects } from 'graphql/queries/getProjects'
import { gradients } from 'styles/theme/gradients'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())
const GreenArrowRightIcon = () => <ArrowRightIcon color='green.400' style={{ width: 10 }} />

export async function getServerSideProps () {
  try {
    const timelineList = await getTimelineList()
    const transformedStack = await getStack()
    const initialProjects = await getProjects()

    return {
      props: {
        timelineList,
        initialProjects,
        transformedStack
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
  timelineList,
  initialProjects,
  transformedStack
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
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
        Software Developer at <HighlightLink href={links.reaktor}>WorkOS</HighlightLink>
        <br />
        Following the flow of {' '}
        <Text
          bgClip='text'
          display='inline'
          bgGradient={gradients.greenToBlue}
        >
          learning <GreenArrowRightIcon /> creating <GreenArrowRightIcon /> teaching 🚀
        </Text>
      </Paragraph>

      <ProjectsList
        initialProjects={initialProjects}
        transformedStack={transformedStack}
      />
      <Timeline timelineList={timelineList} />
    </VStack>
  )
}
