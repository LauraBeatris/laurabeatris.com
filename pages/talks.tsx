import { VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { HighlightLink } from 'components/Base/HighlightLink'

export default function Talks () {
  return (
    <VStack
      width='full'
      spacing={10}
      paddingTop={5}
      paddingBottom={10}
      alignItems='flex-start'
    >
      <VStack
        width='full'
        spacing={5}
        alignItems='flex-start'
      >
        <Heading as='h2'>Talks</Heading>
        <Paragraph>
          I love to share the knowledge that I gain throughout my open-source projects and experiences with the community.
        </Paragraph>
        <Paragraph>
          Feel free to
          {' '}<HighlightLink href='mailto:laurabeatriserafim@gmail.com' isExternal={false}>contact me</HighlightLink>
          {' '} for meetups, conferences or podcasts.
        </Paragraph>
      </VStack>
    </VStack>
  )
}
