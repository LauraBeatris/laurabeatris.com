import { useState } from 'react'
import { Flex, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Project } from 'components/Project'
import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { PaginationButton } from 'components/PaginationButton'
import { ProjectFilters } from 'components/ProjectFilters'
import { usePagination } from 'hooks/usePagination'
import { Project as ProjectType } from 'graphql/schema'
import { useProjects } from 'hooks/useProjects'

import { ProjectsListProps } from './types'

const popoverText = 'Click on the projects to see more details about it'

export function ProjectsList ({
  initialProjects,
  transformedStack
}: ProjectsListProps) {
  const [title, setTitle] = useState('')
  const { data: projects, isLoading } = useProjects({ title }, {
    initialData: initialProjects
  })

  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<ProjectType>({ list: projects })

  const shouldShowPagination = !isLoading && projects?.length > 1

  return (
    <VStack
      width='full'
      spacing={5}
      alignItems='flex-start'
    >
      <Stack
        width='full'
        paddingTop={10}
        direction={['column', 'column', 'row']}
        alignItems={['flex-start', 'flex-start', 'center']}
        justifyContent='space-between'
      >
        <Heading as='h2'>
          Projects
          <Popover
            popoverText={popoverText}
            buttonContent={<InfoIcon boxSize={5} color='green.400' />}
          />
        </Heading>

        <ProjectFilters setTitle={setTitle} transformedStack={transformedStack} />
      </Stack>

      <SimpleGrid
        as='ul'
        css={{ listStyle: 'none' }}
        width='full'
        spacing={4}
        columns={[1, null, 2]}
      >
        {
          (data ?? []).map(({
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

      {
        shouldShowPagination && (
          <PaginationButton
            showMore={hasMoreItems}
            onClick={handlePagination}
            alignSelf='center'
          />
        )
      }
    </VStack>
  )
}
