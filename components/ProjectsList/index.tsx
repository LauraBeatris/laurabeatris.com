import { Flex, SimpleGrid, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Project } from 'components/Project'
import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { PaginationButton } from 'components/PaginationButton'
import { useProjectsPagination } from 'hooks/useProjectsPagination'

import { ProjectsListProps } from './types'

const popoverText = 'Click on the projects to see more details about it'

export function ProjectsList ({ projects }: ProjectsListProps) {
  const {
    data,
    hasMoreProjects,
    handlePagination
  } = useProjectsPagination(projects)

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
        as='ul'
        css={{ listStyle: 'none' }}
        width='full'
        spacing={4}
        columns={[1, null, 2]}
      >
        {
          data.map(({
            title,
            stack,
            liveUrl,
            githubUrl,
            mainImage,
            description
          }) => {
            const { url } = mainImage

            return (
              <Flex
                as='li'
                key={title}
                width='full'
              >
                <Project
                  width='full'
                  title={title}
                  stack={stack}
                  liveUrl={liveUrl}
                  githubUrl={githubUrl}
                  mainImageUrl={url}
                  description={description}
                />
              </Flex>
            )
          })
        }
      </SimpleGrid>

      <PaginationButton
        showMore={hasMoreProjects}
        onClick={handlePagination}
        alignSelf='center'
      />
    </VStack>
  )
}
