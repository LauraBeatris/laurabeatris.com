import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { CONTENT_FRAGMENT } from 'graphql/fragments/contentFragment'
import { GetTalksPageQuery } from '__generated__/graphql/schema'

const GET_TALKS_PAGE_QUERY = gql`
  ${CONTENT_FRAGMENT}
  query GetTalksPage {
    talks: contents(where: {category: Talk}) {
     ...ContentFields
    }
    podcasts: contents(where: {category: PodcastParticipation}) {
      ...ContentFields
    }
  }
`

export async function getTalksPage () {
  return graphQLClient.request<GetTalksPageQuery>(
    GET_TALKS_PAGE_QUERY
  )
}
