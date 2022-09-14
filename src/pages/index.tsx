import { InferGetStaticPropsType } from 'next'
import { Text, VStack } from '@chakra-ui/react'
import useSWR, { SWRConfig } from 'swr'
import { ArrowRightIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'
import { ProjectsList } from 'components/ProjectsList'
import { Timeline } from 'components/Timeline'
import { links } from 'constants/links'
import { SWRCacheKeyGetters } from 'hooks/SWRCacheKeyGetters'
import { getDayOfWeek } from 'utils/getDayOfWeek'
import { gradients } from 'styles/theme/gradients'
import { getHomePage } from 'graphql/queries/getHomePage'
import { getTimeline } from 'graphql/queries/getTimelineList'

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())
const GreenArrowRightIcon = () => <ArrowRightIcon color='green.400' style={{ width: 10 }} />

type HomeContainerProps = InferGetStaticPropsType<typeof getStaticProps>

export async function getStaticProps () {
  try {
    const { stackCategories } = await getHomePage()
    const timeline = await getTimeline()

    return {
      props: {
        fallback: {
          [SWRCacheKeyGetters.timeline]: timeline
        },
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

function HomeContent ({ stackCategories }: Pick<HomeContainerProps, 'stackCategories'>) {
  return (
    <VStack
      width='full'
      alignItems='flex-start'
      paddingTop={5}
      paddingBottom={10}
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

      <ProjectsList stackCategories={stackCategories} />
      <Timeline />
    </VStack>
  )
}

export default function HomeContainer ({ fallback, stackCategories }: HomeContainerProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <HomeContent stackCategories={stackCategories} />
    </SWRConfig>
  )
}
