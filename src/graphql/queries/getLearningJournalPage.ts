import { gql } from 'graphql-request'
import { formatRFC3339 } from 'date-fns'

import { graphQLClient } from 'config/graphQLClient'

const GET_LEARNING_JOURNAL_PAGE_QUERY = gql`
  query GetLearningJournalPage(
    $where: LearningJournalWhereInput
    $first: Int
    $after: String
  ) {
    learningJournalsConnection(
      orderBy: date_DESC
      where: $where
      first: $first
      after: $after
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
        pageSize
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
    first: 2,
    after,
    before,
    ...(date ? { where: { date: formatRFC3339(new Date(date)) } } : {})
  }

  const { learningJournalsConnection } = await graphQLClient.request(
    GET_LEARNING_JOURNAL_PAGE_QUERY,
    variables
  )

  return learningJournalsConnection
}
