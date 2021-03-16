import { useState } from 'react'
import { Flex, HStack, SimpleGrid, Spinner, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useDebounce } from 'use-debounce'

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
  const [debouncedTitle] = useDebounce(title, 500)
  const { data: projects, isLoading, isFetching } = useProjects({ title: debouncedTitle }, {
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

        <Stack
          spacing={4}
          direction={['row-reverse', null, 'row']}
          alignItems='center'
        >
          {
            isFetching && <Spinner speed='2s' size='sm' />
          }
          <ProjectFilters setTitle={setTitle} transformedStack={transformedStack} />
        </Stack>
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
