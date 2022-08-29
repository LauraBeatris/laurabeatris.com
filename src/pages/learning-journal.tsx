import { useState } from 'react'
import {
  Flex,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'
import useSWR, { SWRConfig, unstable_serialize } from 'swr'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { LearningJournalList } from 'components/LearningJournalList'
import { SingleDateSelector } from 'components/SingleDateSelector'
import { HydrationSkeleton } from 'components/Base/HydrationSkeleton'
import { LearningJournal as LearningJournalType } from 'graphql/schema'
import { gradients } from 'styles/theme/gradients'
import { getLearningJournalPage } from 'graphql/queries/getLearningJournalPage'

export async function getStaticProps () {
  try {
    return {
      props: {
        fallback: {
          [unstable_serialize([
            'learning-journal-page',
            undefined
          ])]: await getLearningJournalPage()
        }
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)

    return {
      props: {}
    }
  }
}

type FormattedLearningJournal = Omit<LearningJournalType, 'date'> & {
  dateTitle: string;
};

function LearningJournalContent () {
  const [date, setDate] = useState<string>()
  const { data: { entries } = {} } = useSWR(
    ['learning-journal-page', date],
    () => getLearningJournalPage(date)
  )

  const formattedEntries = entries?.map(({ date, ...rest }) => ({
    ...rest,
    dateTitle: DateTime.fromISO(date).toFormat('DD')
  }))

  const handleInputValueChange = (inputValue: string) => {
    setDate(inputValue)
  }

  const shouldShowEntries = formattedEntries?.length > 0

  return (
    <VStack
      as='section'
      width='full'
      paddingTop={5}
      paddingBottom={10}
      alignItems='flex-start'
    >
      <VStack as='header' width='full' alignItems='flex-start'>
        <Heading as='h2'>Learning Journal</Heading>

        <Paragraph variant='regular'>
          Documenting my learning journey throughout the years.
        </Paragraph>

        <Flex paddingTop='2'>
          <SingleDateSelector onInputValueChange={handleInputValueChange} />
        </Flex>
      </VStack>

      <HydrationSkeleton
        width='full'
        endColor='transparent'
        startColor='transparent'
      >
        {shouldShowEntries
          ? (
            <List width='full' spacing={6} paddingTop={2} marginBottom={5}>
              {(formattedEntries ?? []).map(
                ({ id, work, resources, dateTitle, curiosity, programming }) => {
                  const shouldShowResources = (resources ?? []).length > 0

                  return (
                    <VStack
                      as='li'
                      key={id}
                      width='full'
                      spacing={5}
                      alignItems='flex-start'
                      paddingTop={5}
                      borderTopWidth={1}
                    >
                      <Text
                        as='h3'
                        bgClip='text'
                        fontSize={22}
                        fontWeight='bold'
                        bgGradient={gradients.greenToBlue}
                      >
                        {dateTitle}
                      </Text>

                      <LearningJournalList title='Work' list={work} />
                      <LearningJournalList
                        title='Programming'
                        list={programming}
                      />
                      <LearningJournalList title='Curiosity' list={curiosity} />

                      {shouldShowResources
                        ? (
                          <>
                            <Heading size='xs'>Resources</Heading>
                            <List spacing={2}>
                              {resources.map(({ url, label }) => (
                                <ListItem key={label}>
                                  <ListIcon as={LinkIcon} />

                                  <Link
                                    href={url}
                                    bgClip='text'
                                    isExternal
                                    fontWeight='bold'
                                    bgGradient={gradients.greenToBlue}
                                    borderBottomWidth={1}
                                    borderBottomColor='gray.100'
                                  >
                                    {label}
                                  </Link>
                                </ListItem>
                              ))}
                            </List>
                          </>
                          )
                        : null}
                    </VStack>
                  )
                }
              )}
            </List>
            )
          : (
            <Flex
              width='full'
              paddingTop='4'
              justifyContent='center'
            >
              <Paragraph
                size='sm'
                variant='medium'
                textAlign='center'
              >
                No entries found
              </Paragraph>
            </Flex>
            )}
      </HydrationSkeleton>
    </VStack>
  )
}

export default function LearningJournalContainer ({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <LearningJournalContent />
    </SWRConfig>
  )
}
