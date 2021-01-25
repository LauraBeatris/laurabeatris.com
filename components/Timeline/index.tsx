import { List, ListItem, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { PaginationButton } from 'components/PaginationButton'
import { usePagination } from 'hooks/usePagination'
import { Timeline as TimelineType } from 'graphql/schema'

import { TimelineProps } from './types'
import { Achievements } from './Achievements'

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
