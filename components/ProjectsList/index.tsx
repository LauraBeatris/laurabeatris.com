import { ChangeEvent, useCallback, useState } from 'react'
import { Flex, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useDebounce } from 'use-debounce'

import { Project } from 'components/Project'
import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { PaginationButton } from 'components/PaginationButton'
import { ProjectFilters } from 'components/ProjectFilters'
import { PAGINATION_ITEMS_PER_PAGE, usePagination } from 'hooks/usePagination'
import { Project as ProjectType } from 'graphql/schema'
import { useProjects } from 'hooks/useProjects'
import { Paragraph } from 'components/Base/Paragraph'

import { ProjectsListProps } from './types'

const PROJECTS_POPOVER_TEXT = <p>Click on the projects to see more details about it.<br /> Also, there are filters to explore projects according to certain titles, technologies, or categories.</p>

const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 500

export function ProjectsList ({
  initialProjects,
  transformedStack
}: ProjectsListProps) {
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState<Array<string>>(undefined)

  const [debouncedTitle] = useDebounce(title, DEFAULT_DEBOUNCE_DELAY_MILLISECONDS)
  const [debouncedCategories] = useDebounce(categories, DEFAULT_DEBOUNCE_DELAY_MILLISECONDS)

  const { data: projects, isLoading, isFetching } = useProjects({
    title: debouncedTitle,
    categories: debouncedCategories
  }, {
    initialData: initialProjects
  })

  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<ProjectType>({ list: projects })

  const handleTitleFilterChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }, [])

  const handleCategoriesFilterChange = useCallback((
    categoryOrCategories: string | Array<string>
  ) => {
    setCategories(
      Array.isArray(categoryOrCategories)
        ? categoryOrCategories
        : [categoryOrCategories]
    )
  }, [])

  const shouldShowPagination = !isLoading && projects?.length > PAGINATION_ITEMS_PER_PAGE
  const shouldShowEmptyListMessage = !isLoading && !isFetching && projects?.length === 0

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
            popoverTextElement={PROJECTS_POPOVER_TEXT}
            buttonContent={<InfoIcon boxSize={5} color='green.400' />}
          />
        </Heading>

        <ProjectFilters
          isFetching={isFetching}
          transformedStack={transformedStack}
          onTitleFilterChange={handleTitleFilterChange}
          onCategoriesFilterChange={handleCategoriesFilterChange}
        />
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
                  description={description}
                  mainImageUrl={url}
                />
              </Flex>
            )
          })
        }
      </SimpleGrid>

      {
        shouldShowEmptyListMessage && (
          <Paragraph
            size='sm'
            variant='regular'
            alignSelf='center'
          >
            No projects were found
          </Paragraph>
        )
      }

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
