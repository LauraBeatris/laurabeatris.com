import { gql } from 'graphql-request'
import uniq from 'lodash.uniq'
import union from 'lodash.union'

import { graphQLClient } from 'config/graphQLClient'
import { GetHomePageQuery, StackCategory } from '__generated__/graphql/schema'
import { STACK_FRAGMENT } from 'graphql/fragments/stackFragment'

const GET_HOME_PAGE_QUERY = gql`
  ${STACK_FRAGMENT}
  query GetHomePage(
    $title: String = ""
    $categories: [StackCategory!] = [Frontend, Backend, Package, Mobile]
  ) {
    initialProjects: stacks(
      where: { categories_contains_some: $categories }
      orderBy: createdAt_DESC
    ) {
      ...StackFields
    }
    stacks {
      id
      categories
    }
  }
`

export async function getHomePage (context?) {
  const [, filters = {}] = context?.queryKey ?? []

  let {
    stacks,
    initialProjects
  } = await graphQLClient.request<GetHomePageQuery>(GET_HOME_PAGE_QUERY, {
    filters
  })

  initialProjects = initialProjects.reduce((accumulator, { projects }) => [
    ...accumulator,
    ...projects
  ], [])

  const stackCategories = stacks.reduce<Array<StackCategory>>(
    (accumulator, { categories }) => uniq(union(accumulator, categories)),
    []
  )

  return { stackCategories, initialProjects }
}
