import { ChangeEvent, useCallback, useState } from 'react'
import { Stack, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { ProjectFilters } from 'components/ProjectFilters'
import { Paragraph } from 'components/Base/Paragraph'
import { StackCategory } from '__generated__/graphql/schema'

type ProjectsListProps = {
  stackCategories: Array<StackCategory>;
}

const PROJECTS_POPOVER_TEXT = <p>Click on the projects to see more details about it.<br /> Also, there are filters to explore projects according to certain titles and technologies.</p>
export const INITIAL_STACK_CATEGORIES = [
  StackCategory.Backend,
  StackCategory.Frontend,
  StackCategory.Package,
  StackCategory.Mobile
]

const isWorkInProgressFeatureFlag = process.env.NEXT_PUBLIC_WORK_IN_PROGRESS_FEATURE_FLAG

export function ProjectsList ({
  stackCategories
}: ProjectsListProps) {
  const [, setTitle] = useState('')
  const [selectedStackCategories, setSelectedStackCategories] = useState(INITIAL_STACK_CATEGORIES)

  // const [debouncedTitle] = useDebounce(title, DEFAULT_DEBOUNCE_DELAY_MILLISECONDS)
  // const [debouncedStackCategories] = useDebounce(stackCategories, DEFAULT_DEBOUNCE_DELAY_MILLISECONDS)

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
      setSelectedStackCategories(INITIAL_STACK_CATEGORIES)
      return
    }

    setSelectedStackCategories(
      Array.isArray(categoryOrCategories)
        ? categoryOrCategories
        : [categoryOrCategories]
    )
  }, [])

  // const shouldShowPagination = !isLoading && projects?.length > PAGINATION_ITEMS_PER_PAGE
  const shouldShowEmptyListMessage = !isWorkInProgressFeatureFlag

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

          {/* <Flex paddingTop={1}>
            {
              isFetching
                ? <Spinner size='sm' display={['initial', null, 'none']} />
                : null
            }
          </Flex> */}
        </Stack>

        <ProjectFilters
          stackCategories={stackCategories}
          onTitleInputChange={handleTitleInputChange}
          selectedStackCategories={selectedStackCategories}
          onStackCategoryOptionsChange={handleStackCategoryOptionsChange}
        />
      </Stack>

      {/* <SimpleGrid
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
      </SimpleGrid> */}

      {
        isWorkInProgressFeatureFlag && (
          <Paragraph
            size='sm'
            variant='medium'
            alignSelf='center'
            textAlign='center'
          >
            🚧 Currently building/baking new projects
          </Paragraph>
        )
      }

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

      {/* {
        shouldShowPagination && (
          <PaginationButton
            showMore={hasMoreItems}
            onClick={handlePagination}
            alignSelf='center'
          />
        )
      } */}
    </VStack>
  )
}
