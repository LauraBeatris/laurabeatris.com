import { gql } from 'graphql-request'
import { formatRFC3339 } from 'date-fns'

import { graphQLClient } from 'config/graphQLClient'
import { GetLearningJournalPageQuery, GetLearningJournalPageQueryVariables } from '__generated__/graphql/schema'

const GET_LEARNING_JOURNAL_PAGE_QUERY = gql`
  query GetLearningJournalPage(
    $where: LearningJournalWhereInput
    $limit: Int!
    $offset: Int!
  ) {
    learningJournalsConnection(
      orderBy: date_DESC
      where: $where
      first: $limit
      skip: $offset
    ) {
      aggregate {
        count
      }
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
      }
    }
  }
`

export const LEARNING_JOURNAL_PAGE_SIZE = 2
export async function getLearningJournalPage (
  page: number,
  date: string
) {
  const variables = {
    limit: LEARNING_JOURNAL_PAGE_SIZE,
    offset: Number((page - 1) * LEARNING_JOURNAL_PAGE_SIZE),
    ...(date
      ? {
          where: {
            date: formatRFC3339(new Date(date))
          }
        }
      : {})
  }

  const { learningJournalsConnection } = await graphQLClient.request<GetLearningJournalPageQuery, GetLearningJournalPageQueryVariables>(
    GET_LEARNING_JOURNAL_PAGE_QUERY,
    variables
  )

  return learningJournalsConnection
}
