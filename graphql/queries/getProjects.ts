import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Project } from 'graphql/schema'

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
      stack {
        id
        framework
        language
        libraries
        databases
        categories
      }
    }
  }
`

export async function getProjects () {
  const { projects } = await graphQLClient.request(
    GET_PROJECTS_QUERY
  )

  return projects as Array<Project>
}
