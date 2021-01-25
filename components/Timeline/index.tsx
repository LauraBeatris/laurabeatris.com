import { List, ListItem, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'

import { TimelineProps } from './types'
import { Achievements } from './Achievements'

export function Timeline ({ timeline }: TimelineProps) {
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
    </VStack>
  )
}
