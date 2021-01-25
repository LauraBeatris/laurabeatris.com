import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Content } from 'graphql/schema'

const GET_TALKS_QUERY = gql`
  query GetTalks {
    talks: contents(where: {category: Talk}) {
      id
      url
      title
      image {
        id
        url
      }
      subtitle
    }
  }
`

export async function getTalks () {
  const { talks } = await graphQLClient.request(
    GET_TALKS_QUERY
  )

  return talks as Array<Content>
}
