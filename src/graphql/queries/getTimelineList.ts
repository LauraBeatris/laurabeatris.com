import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { GetTimelineQuery } from '__generated__/graphql/schema'

const GET_TIMELINE_QUERY = gql`
  query GetTimeline {
    timeline: timelines(orderBy: year_DESC) {
      id
      year
      achievements(orderBy: createdAt_DESC) {
        id
        title
        description
      }
    }
  }
`

export async function getTimeline () {
  const { timeline } = await graphQLClient.request<GetTimelineQuery>(GET_TIMELINE_QUERY)

  return timeline
}
