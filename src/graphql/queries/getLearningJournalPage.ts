import { gql } from 'graphql-request'
import { formatRFC3339 } from 'date-fns'

import { graphQLClient } from 'config/graphQLClient'

const GET_LEARNING_JOURNAL_PAGE_QUERY = gql`
  query GetLearningJournalPage($where: LearningJournalWhereInput) {
    entries: learningJournals(orderBy: date_DESC, where: $where) {
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
`

export async function getLearningJournalPage (date: string) {
  return graphQLClient.request(
    GET_LEARNING_JOURNAL_PAGE_QUERY,
    date
      ? {
          where: { date: formatRFC3339(new Date(date)) }
        }
      : undefined
  )
}
