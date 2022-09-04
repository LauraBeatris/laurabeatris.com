import { useQuery, UseQueryOptions } from 'react-query'

import { getProjects, GetHomePageQueryFilters } from 'graphql/queries/getProjects'
import { Project } from 'graphql/schema'

export const GET_PROJECTS_QUERY_KEY = 'projects'

export function useProjects (
  filters: GetHomePageQueryFilters,
  options?: UseQueryOptions<Array<Project>>
) {
  return useQuery<Array<Project>>([GET_PROJECTS_QUERY_KEY, filters], getProjects, options)
}
