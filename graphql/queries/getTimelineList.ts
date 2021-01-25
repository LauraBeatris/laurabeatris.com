import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Timeline } from 'graphql/schema'

const GET_TIMELINE_LIST_QUERY = gql`
  query GetTimelineList {
    timelineList: timelines(orderBy: year_DESC) {
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

export async function getTimelineList () {
  const { timelineList } = await graphQLClient.request(
    GET_TIMELINE_LIST_QUERY
  )

  return timelineList as Array<Timeline>
}
