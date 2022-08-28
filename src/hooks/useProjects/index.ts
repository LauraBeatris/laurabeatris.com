import { useQuery, UseQueryOptions } from 'react-query'

import { getProjects, GetProjectsQueryFilters } from 'graphql/queries/getProjects'
import { Project } from 'graphql/schema'

export const GET_PROJECTS_QUERY_KEY = 'projects'

export function useProjects (
  filters: GetProjectsQueryFilters,
  options?: UseQueryOptions<Array<Project>>
) {
  return useQuery<Array<Project>>([GET_PROJECTS_QUERY_KEY, filters], getProjects, options)
}
