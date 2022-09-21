import { List, ListItem, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { PaginationButton } from 'components/PaginationButton'
import type { Timeline } from '__generated__/graphql/schema'

import { useTimelineQuery } from 'hooks/useTimelineQuery'

import { Achievements } from './Achievements'

export function Timeline () {
  const { timeline, handleNextPage, resetPagination } = useTimelineQuery()
  const hasNextPage = timeline[timeline?.length - 1]?.hasNextPage

  const onPaginationClick = () => {
    if (!hasNextPage) {
      resetPagination()
      return
    }

    handleNextPage()
  }

  return (
    <VStack
      width='full'
      spacing={5}
      alignItems='flex-start'
    >
      <Heading as='h2' paddingTop={10}>
        Timeline
      </Heading>

      <List spacing={4}>
        {
          (timeline ?? []).map(({ year, achievements }) => (
            <ListItem key={year}>
              <Heading size='sm'>
                {year}
              </Heading>

              <Achievements achievements={achievements} />
            </ListItem>
          ))
        }
      </List>

      <PaginationButton
        onClick={onPaginationClick}
        showMore={hasNextPage}
        alignSelf='center'
      />
    </VStack>
  )
}
