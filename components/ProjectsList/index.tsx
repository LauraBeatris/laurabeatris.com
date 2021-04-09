import { ChangeEvent, useCallback, useState } from 'react'
import { Flex, SimpleGrid, Spinner, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import { useDebounce } from 'use-debounce'

import { Project } from 'components/Project'
import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { PaginationButton } from 'components/PaginationButton'
import { ProjectFilters } from 'components/ProjectFilters'
import { PAGINATION_ITEMS_PER_PAGE, usePagination } from 'hooks/usePagination'
import { Project as ProjectType, StackCategory, StackCategoryEnum } from 'graphql/schema'
import { useProjects } from 'hooks/useProjects'
import { Paragraph } from 'components/Base/Paragraph'

import { ProjectsListProps } from './types'

const PROJECTS_POPOVER_TEXT = <p>Click on the projects to see more details about it.<br /> Also, there are filters to explore projects according to certain titles and technologies.</p>

const DEFAULT_DEBOUNCE_DELAY_MILLISECONDS = 500

export const INITIAL_STACK_CATEGORIES = [
  StackCategoryEnum.Backend,
  StackCategoryEnum.Frontend,
  StackCategoryEnum.Package,
  StackCategoryEnum.Mobile
]

export function ProjectsList ({
  initialProjects,
  transformedStack
}: ProjectsListProps) {
  const [title, setTitle] = useState('')
  const [stackCategories, setStackCategories] = useState(INITIAL_STACK_CATEGORIES)

  const [debouncedTitle] = useDebounce(title, DEFAULT_DEBOUNCE_DELAY_MILLISECONDS)
  const [debouncedStackCategories] = useDebounce(stackCategories, DEFAULT_DEBOUNCE_DELAY_MILLISECONDS)

  const { data: projects, isFetching, isLoading } = useProjects({
    title: debouncedTitle,
    categories: debouncedStackCategories
  }, {
    initialData: initialProjects
  })

  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<ProjectType>({ list: projects })

  const handleTitleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }, [])

  const handleStackCategoryOptionsChange = useCallback((
    categoryOrCategories: StackCategory | Array<StackCategory>
  ) => {
    const shouldResetStackCategories = (
      Array.isArray(categoryOrCategories) &&
      categoryOrCategories.length === 0
    )

    if (shouldResetStackCategories) {
      setStackCategories(INITIAL_STACK_CATEGORIES)

      return
    }

    setStackCategories(
      Array.isArray(categoryOrCategories)
        ? categoryOrCategories
        : [categoryOrCategories]
    )
  }, [])

  const shouldShowPagination = !isLoading && projects?.length > PAGINATION_ITEMS_PER_PAGE
  const shouldShowEmptyListMessage = !isLoading && projects?.length === 0

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
        <Stack
          direction='row'
          alignItems='center'
          paddingBottom={[5, null, 'initial']}
        >
          <Heading as='h2' css={{ lineHeight: 0 }}>
            Projects
          </Heading>

          <Popover
            popoverTextElement={PROJECTS_POPOVER_TEXT}
            buttonContent={<InfoIcon boxSize={5} color='green.400' />}
          />

          <Flex paddingTop={1}>
            {
              isFetching
                ? <Spinner size='sm' display={['initial', null, 'none']} />
                : null
            }
          </Flex>
        </Stack>

        <ProjectFilters
          stackCategories={stackCategories}
          transformedStack={transformedStack}
          onTitleInputChange={handleTitleInputChange}
          onStackCategoryOptionsChange={handleStackCategoryOptionsChange}
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
