import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Content } from 'graphql/schema'
import { CONTENT_FRAGMENT } from 'graphql/fragments/contentFragment'

const GET_PODCAST_EPISODES = gql`
  ${CONTENT_FRAGMENT}
  query GetPodcastEpisodes {
    podcastEpisodes: contents(where: {category: UseCast}) {
      ...ContentFields
    }
  }
`

export async function getPodcastEpisodes () {
  const { podcastEpisodes } = await graphQLClient.request(
    GET_PODCAST_EPISODES
  )

  return podcastEpisodes as Array<Content>
}
