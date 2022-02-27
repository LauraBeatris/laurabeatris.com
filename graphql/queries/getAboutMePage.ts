import { gql } from 'graphql-request'

import { graphQLClient } from 'config/graphQLClient'
import { AboutMePage } from 'graphql/schema'

const GET_ABOUT_ME_PAGE_QUERY = gql`
  query getAboutMePageSections($id: ID!){
    aboutMePage(where: { id: $id }){
      sections {
        id
        title
      }
    }
  }
`

/**
 * Since "aboutMePage" is a contextual model, there should be
 * only one content entry for it, which at the moment relies on this ID
 */
const pageIDFromCMS = 'cl04asq370z7o0ewwt2726r7t'

export async function getAboutMePage () {
  const { aboutMePage } = await graphQLClient.request(
    GET_ABOUT_ME_PAGE_QUERY,
    { id: pageIDFromCMS }
  )

  return aboutMePage as AboutMePage
}
