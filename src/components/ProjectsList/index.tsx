import { ChangeEvent, useCallback, useState } from 'react'
import { Flex, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Popover } from 'components/Base/Popover'
import { ProjectFilters } from 'components/ProjectFilters'
import { Project as ProjectType } from '__generated__/graphql/schema'
import { Project } from 'components/Project'

type ProjectsListProps = {
  initialProjects: Array<ProjectType>;
}

const PROJECTS_POPOVER_TEXT = <p>Click on the projects to see more details about it.<br /> Also, there are filters to explore projects according to certain titles and technologies.</p>

export function ProjectsList ({
  initialProjects
}: ProjectsListProps) {
  const [, setTitle] = useState('')

  const handleTitleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }, [])

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
          onTitleInputChange={handleTitleInputChange}
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
          (initialProjects ?? []).map(({
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
    </VStack>
  )
}
