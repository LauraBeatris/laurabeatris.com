import { gql } from 'graphql-request'
import { QueryFunctionContext } from 'react-query'

import { graphQLClient } from 'config/graphQLClient'
import { Project, StackCategory } from 'graphql/schema'

const GET_PROJECTS_BY_STACKS_QUERY = gql`
 query GetProjectsByStacks(
   $title: String = "",
   $categories: [StackCategory!] = [Frontend, Backend, Package, Mobile]
  ) {
    stacks(where: {categories_contains_some: $categories}, orderBy: createdAt_DESC) {
      id
      projects(where: {title_contains: $title}) {
        id
        title
        liveUrl
        githubUrl
        description
        stack {
          id
          framework
          language
          libraries
          databases
          categories
        }
        mainImage {
          id
          url
        }
      }
    }
  }
`

export type GetProjectsQueryFilters = {
  title: string;
  categories: Array<StackCategory>;
}

export type GetProjectsQueryKey = [
  queryIdentifier: string,
  filters: GetProjectsQueryFilters
]

export async function getProjects (context?: QueryFunctionContext<GetProjectsQueryKey>) {
  const [, filters = {}] = context?.queryKey ?? []

  const { stacks } = await graphQLClient.request(
    GET_PROJECTS_BY_STACKS_QUERY,
    filters
  )

  const projects = stacks.reduce((currentProjects, { projects }) => [
    ...currentProjects,
    ...projects
  ], [])

  return projects as Array<Project>
}
