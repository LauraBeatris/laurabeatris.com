import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { GetTimelineQuery } from '__generated__/graphql/schema'

const GET_TIMELINE_QUERY = gql`
  query GetTimeline($first: Int) {
    timeline: timelines(orderBy: year_DESC, first: $first) {
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

export const TIMELINE_PAGE_SIZE = 2
export async function getTimeline (pageIndex = 0) {
  const first = (pageIndex + 1) * TIMELINE_PAGE_SIZE
  const { timeline } = await graphQLClient.request<GetTimelineQuery>(GET_TIMELINE_QUERY, {
    first
  })

  return timeline
}
