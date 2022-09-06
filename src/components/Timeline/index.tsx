import { List, ListItem, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { PaginationButton } from 'components/PaginationButton'
import { usePagination } from 'hooks/usePagination'
import type { Achievement, Timeline } from '__generated__/graphql/schema'

import { Achievements } from './Achievements'

type TimelineItem = Pick<Timeline, 'id' | 'year'> & {
  achievements: Array<Pick<Achievement, 'id' | 'title' | 'description'>>
}
type TimelineProps = {
  timelineList: Array<TimelineItem>
}

export function Timeline ({ timelineList }: TimelineProps) {
  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<TimelineItem>({ list: timelineList, itemsPerPage: 2 })

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
