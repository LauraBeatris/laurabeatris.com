import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { calculatePagesCount } from 'hooks/useLearningJournalQuery'
import { GetLearningJournalPagesCountQuery } from '__generated__/graphql/schema'

import { LEARNING_JOURNAL_PAGE_SIZE } from './getLearningJournalPage'

const GET_LEARNING_JOURNAL_PAGES_COUNT_QUERY = gql`
  query GetLearningJournalPagesCount {
    learningJournalsConnection(
      orderBy: date_DESC
    ) {
      aggregate {
        count
      }
    }
  }
`

export async function getLearningJournalPagesCount () {
  const {
    learningJournalsConnection: {
      aggregate
    }
  } = await graphQLClient.request<GetLearningJournalPagesCountQuery>(
    GET_LEARNING_JOURNAL_PAGES_COUNT_QUERY
  )

  return calculatePagesCount(LEARNING_JOURNAL_PAGE_SIZE, aggregate?.count)
}
