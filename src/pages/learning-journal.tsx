import type { InferGetStaticPropsType } from 'next'
import { Flex, Link, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { PaginationButton } from 'components/PaginationButton'
import { LearningJournalList } from 'components/LearningJournalList'
import { SingleDateSelector } from 'components/SingleDateSelector'
import { HydrationSkeleton } from 'components/Base/HydrationSkeleton'
import { getLearningJournals } from 'graphql/queries/getLearningJournals'
import { usePagination } from 'hooks/usePagination'
import { LearningJournal as LearningJournalType } from 'graphql/schema'
import { gradients } from 'styles/theme/gradients'

export async function getStaticProps () {
  try {
    const learningJournals = await getLearningJournals()

    return {
      props: {
        learningJournals
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
}

export default function LearningJournal ({
  learningJournals
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const formattedLearningJournals = learningJournals.map(({ date, ...rest }) => ({
    ...rest,
    dateTitle: DateTime.fromISO(date)
      .toFormat('DD')
  }))

  const {
    data,
    hasMoreItems,
    handlePagination
  } = usePagination<FormattedLearningJournal>({
    list: formattedLearningJournals,
    itemsPerPage: 2
  })

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
          <SingleDateSelector />
        </Flex>
      </VStack>

      <HydrationSkeleton
        width='full'
        endColor='transparent'
        startColor='transparent'
      >
        <List
          width='full'
          spacing={6}
          paddingTop={2}
          marginBottom={5}
        >
          {
            (data ?? []).map(({
              id,
              work,
              resources,
              dateTitle,
              curiosity,
              programming
            }) => {
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
                  <LearningJournalList title='Programming' list={programming} />
                  <LearningJournalList title='Curiosity' list={curiosity} />

                  {
                    shouldShowResources
                      ? (
                        <>
                          <Heading size='xs'>Resources</Heading>
                          <List spacing={2}>
                            {
                              resources.map(({ url, label }) => (
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
                              ))
                             }
                          </List>
                        </>
                        )
                      : null
                    }
                </VStack>
              )
            })
          }
        </List>
      </HydrationSkeleton>

      <PaginationButton
        showMore={hasMoreItems}
        onClick={handlePagination}
        alignSelf='center'
      />
    </VStack>
  )
}
