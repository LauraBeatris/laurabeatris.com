import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { GetAboutMePageQuery, GetAboutMePageQueryVariables } from '__generated__/graphql/schema'

const GET_ABOUT_ME_PAGE_QUERY = gql`
  query GetAboutMePage($id: ID!){
    aboutMePage(where: { id: $id }){
      sections {
        id
        title
        description {
          raw
        }
        images(orderBy: createdAt_DESC) {
          id
          subCaption
          mainCaption
          asset {
            id
            url
          }
        }
      }
    }
  }
`

/**
 * Since "aboutMePage" is a subject model, there should be only one content
 * entry for it, which at the moment relies on this ID
 * @see {@link https://graphcms.com/academy/what-is-content-modeling} for more info regarding subject models
 */
const pageIDFromCMS = 'cl7xkroo4ll3t0bu5m2vmo69c'

export async function getAboutMePage () {
  const { aboutMePage } = await graphQLClient.request<GetAboutMePageQuery, GetAboutMePageQueryVariables>(
    GET_ABOUT_ME_PAGE_QUERY,
    { id: pageIDFromCMS }
  )

  return aboutMePage
}
