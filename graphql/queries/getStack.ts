import { gql } from 'graphql-request'
import uniq from 'lodash.uniq'
import union from 'lodash.union'

import { graphQLClient } from 'config/graphQLClient'
import { TransformedStack } from 'graphql/schema'

const GET_STACK_QUERY = gql`
  query GetStacks {
    stacks {
      id
      framework
      categories
    }
  }
`

export async function getStack () {
  const { stacks } = await graphQLClient.request(
    GET_STACK_QUERY
  )

  const transformedStacks = stacks.reduce(
    (accumulator, {
      categories,
      framework
    }) => ({
      categories: uniq(union(accumulator.categories, categories)),
      frameworks: uniq(union(accumulator.frameworks, [framework]))
    }), {})

  return transformedStacks as TransformedStack
}
