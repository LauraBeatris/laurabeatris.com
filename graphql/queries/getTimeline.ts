import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Timeline } from 'graphql/schema'

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
  const { timeline } = await graphQLClient.request(
    GET_TIMELINE_QUERY
  )

  return timeline as Timeline
}
