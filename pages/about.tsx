import { VStack } from '@chakra-ui/react'

import { getAboutMePage } from 'graphql/queries/getAboutMePage'

import { Heading } from 'components/Base/Heading'
import { HighlightLink } from 'components/Base/HighlightLink'
import { Paragraph } from 'components/Base/Paragraph'
import { PlaceImage } from 'components/PlaceImage'

export const getStaticProps = async () => {
  try {
    const { sections } = await getAboutMePage()

    return {
      props: {
        sections
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return {
      props: {}
    }
  }
}

export default function About ({ sections }) {
  return (
    <VStack
      width='full'
      spacing={10}
      paddingTop={5}
      paddingBottom={10}
      alignItems='flex-start'
    >
      {sections.map(({ id, title }) => (
        <VStack
          key={id}
          width='full'
          spacing={5}
          alignItems='flex-start'
        >
          <Heading as='h2'>{title}</Heading>
        </VStack>
      ))}
    </VStack>
  )
}
