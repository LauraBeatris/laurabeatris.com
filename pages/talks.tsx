import { InferGetStaticPropsType } from 'next'
import { VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { getTalks } from 'graphql/queries/getTalks'
import { getPodcastParticipations } from 'graphql/queries/getPodcastParticipations'
import { ContentList } from 'components/ContentList'

function ContentSection ({ title, contentList }) {
  return (
    <VStack
      width='full'
      spacing={5}
      alignItems='flex-start'
    >
      <Heading as='h2'>{title}</Heading>

      <ContentList contentList={contentList} />
    </VStack>
  )
}

export async function getStaticProps () {
  try {
    const talks = await getTalks()
    const podcastParticipations = await getPodcastParticipations()

    return {
      props: {
        talks,
        podcastParticipations
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

export default function Talks ({
  talks,
  podcastParticipations
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <VStack
      width='full'
      spacing={10}
      paddingTop={5}
      paddingBottom={10}
      alignItems='flex-start'
    >
      <ContentSection
        title='Talks'
        contentList={talks}
      />

      <ContentSection
        title='Podcast Participations'
        contentList={podcastParticipations}
      />
    </VStack>
  )
}
