import { InferGetStaticPropsType } from 'next'
import { VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { ContentList } from 'components/ContentList'
import { getTalksPage } from 'graphql/queries/getTalksPage'

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
    const { talks, podcasts } = await getTalksPage()

    return {
      props: {
        talks,
        podcasts
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
  podcasts
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
        title='Podcasts'
        contentList={podcasts}
      />
    </VStack>
  )
}
