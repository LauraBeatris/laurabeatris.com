import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { LearningJournal } from 'graphql/schema'

const GET_LEARNING_JOURNALS_QUERY = gql`
  query GetLearningJournals {
    learningJournals(orderBy: date_DESC) {
      id
      work
      date
      curiosity
      programming
    }
  }
`

export async function getLearningJournals () {
  const { learningJournals } = await graphQLClient.request(
    GET_LEARNING_JOURNALS_QUERY
  )

  return learningJournals as Array<LearningJournal>
}
