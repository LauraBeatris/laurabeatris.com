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
import { gradients } from 'styles/theme/gradients'
import { getHomePage } from 'graphql/queries/getHomePage'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())
const GreenArrowRightIcon = () => <ArrowRightIcon color='green.400' style={{ width: 10 }} />

export async function getServerSideProps () {
  try {
    const {
      timelineList,
      initialProjects,
      stackCategories
    } = await getHomePage()

    return {
      props: {
        timelineList,
        initialProjects,
        stackCategories
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
  stackCategories
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
        Software Developer at <HighlightLink href={links.reaktor}>Reaktor</HighlightLink>
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
        stackCategories={stackCategories}
      />
      <Timeline timelineList={timelineList} />
    </VStack>
  )
}
