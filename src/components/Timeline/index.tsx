import { List, ListItem, VStack } from '@chakra-ui/react'
import useSWR from 'swr'

import { Heading } from 'components/Base/Heading'
import { PaginationButton } from 'components/PaginationButton'
import { getTimeline } from 'graphql/queries/getTimelineList'
import { SWRCacheKeyGetters } from 'hooks/SWRCacheKeyGetters'
import { usePagination } from 'hooks/usePagination'
import type { Achievement, Timeline } from '__generated__/graphql/schema'

import { Achievements } from './Achievements'

type TimelineItem = Pick<Timeline, 'id' | 'year'> & {
  achievements: Array<Pick<Achievement, 'id' | 'title' | 'description'>>
}

export function Timeline () {
  const { data: timeline } = useSWR(SWRCacheKeyGetters.timeline, getTimeline)
  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<TimelineItem>({ list: timeline, itemsPerPage: 2 })

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
          (data ?? []).map(({ year, achievements }) => (
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
        showMore={hasMoreItems}
        onClick={handlePagination}
        alignSelf='center'
      />
    </VStack>
  )
}
