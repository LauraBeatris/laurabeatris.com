import { gql } from 'graphql-request'
import uniq from 'lodash.uniq'
import union from 'lodash.union'

import { QueryFunctionContext } from 'react-query'

import { graphQLClient } from 'config/graphQLClient'
import { GetHomePageQuery, StackCategory } from 'generated/graphql'

const GET_HOME_PAGE_QUERY = gql`
  query GetHomePage(
    $title: String = ""
    $categories: [StackCategory!] = [Frontend, Backend, Package, Mobile]
  ) {
    initialProjects: stacks(
      where: { categories_contains_some: $categories }
      orderBy: createdAt_DESC
    ) {
      id
      projects(where: { title_contains: $title }) {
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
    timelineList: timelines(orderBy: year_DESC) {
      id
      year
      achievements(orderBy: createdAt_DESC) {
        id
        title
        description
      }
    }
    stacks {
      id
      categories
    }
  }
`

type GetHomePageQueryFilters = {
  title: string;
  categories: Array<StackCategory>;
}

type GetHomePageQueryKey = [
  queryIdentifier: string,
  filters: GetHomePageQueryFilters
]

export async function getHomePage (context?: QueryFunctionContext<GetHomePageQueryKey>) {
  const [, filters = {}] = context?.queryKey ?? []

  let {
    stacks,
    timelineList,
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

  return { timelineList, stackCategories, initialProjects }
}
