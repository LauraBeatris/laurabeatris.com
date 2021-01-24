import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'

const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
      id
      title
      liveUrl
      githubUrl
      description
      mainImage {
        id
        url
      }
      imagesList {
        id
        url
      }
      stack {
        id
        framework
        language
        libraries
        categories
      }
    }
  }
`

export async function getProjects () {
  const result = await graphQLClient.request(
    GET_PROJECTS_QUERY
  )

  return result
}
