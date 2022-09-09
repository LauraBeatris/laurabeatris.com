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
    data
  } = useSWR(SWRCacheKeyGetters.learningJournalEntry(id),
    () => getLearningJournalEntry(id)
  )

  const { date, work, curiosity, programming } = data ?? {}
  const formattedDate = DateTime.fromISO(date).toFormat('DD')

  return (
    <VStack padding='10' as='main'>
      <Text
        as='h1'
        bgClip='text'
        fontSize={32}
        fontWeight='bold'
        bgGradient={gradients.greenToBlue}
      >
        {formattedDate}
      </Text>
      <VStack as='section' alignItems='flex-start'>
        <LearningJournalList title='Work' list={work} />
      </VStack>
      <VStack as='section' alignItems='flex-start'>
        <LearningJournalList title='Programming' list={programming} />
      </VStack>
      <VStack as='section' alignItems='flex-start'>
        <LearningJournalList title='Curiosity' list={curiosity} />
      </VStack>
    </VStack>
  )
}
