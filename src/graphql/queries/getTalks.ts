import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Content } from 'graphql/schema'
import { CONTENT_FRAGMENT } from 'graphql/fragments/contentFragment'

const GET_TALKS_QUERY = gql`
  ${CONTENT_FRAGMENT}
  query GetTalks {
    talks: contents(where: {category: Talk}) {
     ...ContentFields
    }
  }
`

export async function getTalks () {
  const { talks } = await graphQLClient.request(
    GET_TALKS_QUERY
  )

  return talks as Array<Content>
}
