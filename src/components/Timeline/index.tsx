import { List, ListItem, VStack } from '@chakra-ui/react'

import { usePagination } from 'hooks/usePagination'

import { Timeline as TimelineType, Timeline } from 'graphql/schema'

import { Heading } from 'components/Base/Heading'
import { PaginationButton } from 'components/PaginationButton'

import { Achievements } from './Achievements'

type TimelineProps = {
  timelineList: Array<Timeline>
}

export function Timeline ({ timelineList }: TimelineProps) {
  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<TimelineType>({ list: timelineList, itemsPerPage: 2 })

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
