import { useQuery, UseQueryOptions } from 'react-query'

import { getProjects, GetProjectsQueryFilters } from 'graphql/queries/getProjects'
import { Project } from 'graphql/schema'

export function useProjects (
  filters: GetProjectsQueryFilters,
  options?: UseQueryOptions<Array<Project>>
) {
  return useQuery<Array<Project>>(['projects', filters], getProjects, options)
}
