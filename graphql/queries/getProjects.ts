import { gql } from 'graphql-request'
import { QueryFunctionContext } from 'react-query'

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

export type GetProjectsQueryFilters = {
  title: string;
}

export type GetProjectsQueryKey = [
  queryIdentifier: string,
  filters: GetProjectsQueryFilters
]

export async function getProjects (context: QueryFunctionContext<GetProjectsQueryKey>) {
  const [, filters = {}] = context?.queryKey ?? []

  const { projects } = await graphQLClient.request(
    GET_PROJECTS_QUERY,
    filters
  )

  return projects as Array<Project>
}
