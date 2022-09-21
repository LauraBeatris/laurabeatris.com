import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { GetTimelineQuery, GetTimelineQueryVariables } from '__generated__/graphql/schema'

const GET_TIMELINE_QUERY = gql`
  query GetTimeline(
    $first: Int
    $skip: Int
  ) {
    timeline: timelines(
      orderBy: year_DESC
      first: $first
      skip: $skip
    ) {
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
  const skip = pageIndex * TIMELINE_PAGE_SIZE
  const { timeline } = await graphQLClient.request<GetTimelineQuery, GetTimelineQueryVariables>(
    GET_TIMELINE_QUERY,
    {
      skip,
      first: TIMELINE_PAGE_SIZE
    })

  return timeline
}
