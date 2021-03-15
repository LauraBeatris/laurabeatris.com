import { useQuery } from 'react-query'

import { getProjects } from 'graphql/queries/getProjects'

export function useProjects (filters) {
  return useQuery(['projects', filters], getProjects)
}
