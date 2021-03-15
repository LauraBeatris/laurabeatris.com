import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { Project } from 'graphql/schema'

export const GET_PROJECTS_QUERY = gql`
  query GetProjects($title: String = "") {
    projects(where: {
      OR: {
        title_contains: $title
      }
    }) {
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

export async function getProjects (queryData) {
  const [, filters] = queryData.queryKey

  const { projects } = await graphQLClient.request(
    GET_PROJECTS_QUERY,
    filters
  )

  return projects as Array<Project>
}
