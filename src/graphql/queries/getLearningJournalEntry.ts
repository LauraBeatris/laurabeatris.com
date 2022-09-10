import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { GetLearningJournalEntryQuery } from '__generated__/graphql/schema'

const GET_LEARNING_JOURNAL_ENTRY_QUERY = gql`
  query GetLearningJournalEntry($id: ID!) {
    learningJournal(where: {id: $id}) {
      id
      work
      date
      curiosity
      programming
    }
  }
`

export async function getLearningJournalEntry (id: string) {
  const { learningJournal } = await graphQLClient.request<GetLearningJournalEntryQuery>(
    GET_LEARNING_JOURNAL_ENTRY_QUERY,
    { id }
  )

  return learningJournal
}
