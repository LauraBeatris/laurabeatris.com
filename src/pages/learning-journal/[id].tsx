import { Text, VStack } from '@chakra-ui/react'
import useSWR from 'swr'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'

import { SWRCacheKeyGetters } from 'hooks/SWRCacheKeyGetters'
import { getLearningJournalEntry } from 'graphql/queries/getLearningJournalEntry'
import { gradients } from 'styles/theme/gradients'
import { LearningJournalList } from 'components/LearningJournalList'

export default function LearningJournalEntry () {
  const { query } = useRouter()
  const id = query.id as string

  const {
    data, isValidating
  } = useSWR(SWRCacheKeyGetters.learningJournalEntry(id),
    () => getLearningJournalEntry(id)
  )

  const { date, work, curiosity, programming } = data ?? {}
  const formattedDate = DateTime.fromISO(date).toFormat('DD')
  const isLoading = isValidating && !data

  return (
    <VStack padding='10' as='main' alignItems='flex-start'>
      {!isLoading && (
        <>
          <Text
            id='learning-journal-date'
            as='h1'
            bgClip='text'
            fontSize={32}
            fontWeight='bold'
            bgGradient={gradients.greenToBlue}
          >
            {formattedDate}
          </Text>
          <VStack as='section' alignItems='flex-start'>
            <LearningJournalList
              title='🏗 Work'
              list={work}
              listSize='xl'
              headingSize='md'
            />
          </VStack>
          <VStack as='section' alignItems='flex-start'>
            <LearningJournalList
              title='💫 Programming'
              list={programming}
              listSize='xl'
              headingSize='md'
            />
          </VStack>
          <VStack as='section' alignItems='flex-start'>
            <LearningJournalList
              title='😮 Curiosity'
              list={curiosity}
              listSize='xl'
              headingSize='md'
            />
          </VStack>
        </>
      )}
    </VStack>
  )
}
