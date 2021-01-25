import { gql } from 'graphql-request'

export const CONTENT_FRAGMENT = gql`
  fragment ContentFields on Content {
    id
    url
    title
    image {
      id
      url
    }
    subtitle
  }
`
