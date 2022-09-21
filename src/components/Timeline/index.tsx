import { Box, List, ListItem, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { PaginationButton } from 'components/PaginationButton'
import type { Timeline } from '__generated__/graphql/schema'

import { useTimelineQuery } from 'hooks/useTimelineQuery'

import { Achievements } from './Achievements'

function TimelineSkeleton () {
  return (
    <VStack width='full'>
      <Box padding='6' boxShadow='lg' bg='white' w='full'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
      <Box padding='6' boxShadow='lg' bg='white' w='full'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    </VStack>
  )
}

export function Timeline () {
  const { timeline, isLoading, handleNextPage, resetPagination } = useTimelineQuery()
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

      {isLoading
        ? <TimelineSkeleton />
        : (
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
          )}

      <PaginationButton
        onClick={onPaginationClick}
        showMore={hasNextPage}
        alignSelf='center'
      />
    </VStack>
  )
}
