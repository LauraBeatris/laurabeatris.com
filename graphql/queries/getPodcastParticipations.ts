import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Content } from 'graphql/schema'

const GET_PODCAST_PARTICIPATIONS = gql`
  query GetPodcastParticipations {
    podcastParticipations: contents(where: {category: PodcastParticipation}) {
      id
      url
      title
      image {
        id
        url
      }
      subtitle
    }
  }
`

export async function getPodcastParticipations () {
  const { podcastParticipations } = await graphQLClient.request(
    GET_PODCAST_PARTICIPATIONS
  )

  return podcastParticipations as Array<Content>
}
