import { InferGetStaticPropsType } from 'next'
import { Flex, VStack, SimpleGrid } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { ContentBox } from 'components/ContentBox'
import { getTalks } from 'graphql/queries/getTalks'
import { getPodcastParticipations } from 'graphql/queries/getPodcastParticipations'

function ContentSection ({ title, contentList }) {
  return (
    <VStack
      width='full'
      spacing={5}
      alignItems='flex-start'
    >
      <Heading as='h2'>{title}</Heading>

      <SimpleGrid
        as='ul'
        css={{ listStyle: 'none' }}
        width='full'
        spacing={8}
        columns={[1, null, 2]}
      >
        {
          (contentList ?? []).map(({
            url,
            title,
            image,
            subtitle
          }) => {
            const { url: imageUrl } = image

            return (
              <Flex
                as='li'
                key={title}
                width='full'
              >
                <ContentBox
                  url={url}
                  width='full'
                  title={title}
                  imageSrc={imageUrl}
                  subtitle={subtitle}
                />
              </Flex>
            )
          })
        }
      </SimpleGrid>
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
