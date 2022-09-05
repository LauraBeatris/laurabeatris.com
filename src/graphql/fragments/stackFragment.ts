import { gql } from 'graphql-request'

export const STACK_FRAGMENT = gql`
  fragment StackFields on Stack {
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
`
