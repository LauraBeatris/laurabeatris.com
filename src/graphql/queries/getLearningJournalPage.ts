import { gql } from 'graphql-request'
import { formatRFC3339 } from 'date-fns'

import { graphQLClient } from 'config/graphQLClient'

const CURSOR_PAGE_SIZE = 2
const GET_LEARNING_JOURNAL_PAGE_QUERY = gql`
  query GetLearningJournalPage(
    $where: LearningJournalWhereInput
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    learningJournalsConnection(
      orderBy: date_DESC
      where: $where
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        node {
          id
          work
          date
          curiosity
          programming
          resources {
            id
            url
            label
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export async function getLearningJournalPage ({
  date,
  after,
  before
}: Partial<{ date: string, after: string, before: string }> = {}) {
  const variables = {
    after,
    before,
    ...(before ? { last: CURSOR_PAGE_SIZE } : { first: CURSOR_PAGE_SIZE }),
    ...(date
      ? {
          where: {
            date: formatRFC3339(new Date(date))
          }
        }
      : {})
  }

  const { learningJournalsConnection } = await graphQLClient.request(
    GET_LEARNING_JOURNAL_PAGE_QUERY,
    variables
  )

  return learningJournalsConnection
}
