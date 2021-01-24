import { SimpleGrid, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Project } from 'components/Project'
import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { ContinueToExploreButton } from 'components/ContinueToExploreButton'

const popoverText = 'Click on the projects to see more details about it'

export function ProjectsList ({ projects }) {
  return (
    <VStack
      width='full'
      spacing={5}
      alignItems='flex-start'
    >
      <Heading as='h2' paddingTop={10}>
        Projects
        <Popover
          popoverText={popoverText}
          buttonContent={<InfoIcon boxSize={5} color='green.400' />}
        />
      </Heading>

      <SimpleGrid
        width='full'
        spacing={4}
        columns={[1, null, 2]}
      >
        {(projects ?? []).map(({
          title,
          stack,
          liveUrl,
          githubUrl,
          mainImage,
          description
        }) => {
          const { url } = mainImage

          return (
            <Project
              key={title}
              title={title}
              stack={stack}
              liveUrl={liveUrl}
              githubUrl={githubUrl}
              mainImageUrl={url}
              description={description}
            />
          )
        })}
      </SimpleGrid>

      <ContinueToExploreButton alignSelf='center' />
    </VStack>
  )
}
