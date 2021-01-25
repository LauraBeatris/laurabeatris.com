import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Content } from 'graphql/schema'
import { CONTENT_FRAGMENT } from 'graphql/fragments/contentFragment'

const GET_PODCAST_PARTICIPATIONS = gql`
  ${CONTENT_FRAGMENT}
  query GetPodcastParticipations {
    podcastParticipations: contents(where: {category: PodcastParticipation}) {
      ...ContentFields
    }
  }
`

export async function getPodcastParticipations () {
  const { podcastParticipations } = await graphQLClient.request(
    GET_PODCAST_PARTICIPATIONS
  )

  return podcastParticipations as Array<Content>
}
