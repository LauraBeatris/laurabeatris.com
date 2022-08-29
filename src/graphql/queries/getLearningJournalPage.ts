import { gql } from 'graphql-request'
import { formatRFC3339 } from 'date-fns'

import { graphQLClient } from 'config/graphQLClient'

const GET_LEARNING_JOURNAL_PAGE_QUERY = gql`
  query GetLearningJournalPage($where: LearningJournalWhereInput) {
    learningJournalsConnection(
      orderBy: date_DESC
      where: $where
      first: 2
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

export async function getLearningJournalPage (date?: string) {
  const { learningJournalsConnection } = await graphQLClient.request(
    GET_LEARNING_JOURNAL_PAGE_QUERY,
    date
      ? {
          where: { date: formatRFC3339(new Date(date)) }
        }
      : undefined
  )

  return learningJournalsConnection
}
