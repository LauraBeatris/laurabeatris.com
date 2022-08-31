import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  List,
  ListIcon,
  ListItem,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'
import useSWR, { SWRConfig } from 'swr'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { LearningJournalList } from 'components/LearningJournalList'
import { SingleDateSelector } from 'components/SingleDateSelector'
import { HydrationSkeleton } from 'components/Base/HydrationSkeleton'
import { gradients } from 'styles/theme/gradients'
import {
  Cursors,
  getLearningJournalPage
} from 'graphql/queries/getLearningJournalPage'

const initialDate = null
const initialCursors = {
  after: null,
  before: null
}

function getSWRKey (date?: string, cursors?: Cursors) {
  return `learning-journal/date:${date}/after:${cursors?.after}/before:${cursors?.before}`
}

export async function getStaticProps () {
  try {
    return {
      props: {
        fallback: {
          [getSWRKey()]: await getLearningJournalPage()
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

function LearningJournalSkeleton () {
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
      <Box padding='6' boxShadow='lg' bg='white' w='full'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    </VStack>
  )
}

function LearningJournalEntries ({ isLoading, entries }) {
  if (isLoading) {
    return <LearningJournalSkeleton />
  }

  if (!entries?.length) {
    return (
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
    )
  }

  return (
    <VStack>
      <List width='full' spacing={6} paddingTop={2} marginBottom={5}>
        {entries.map(
          ({
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
    </VStack>
  )
}

function LearningJournalContent () {
  const [date, setDate] = useState<string>(initialDate)
  const [cursors, setCursors] = useState<Cursors>(initialCursors)

  const {
    data: { edges, pageInfo } = {},
    mutate,
    isValidating
  } = useSWR(getSWRKey(date, cursors), () =>
    getLearningJournalPage(date, cursors)
  )

  const { hasPreviousPage, hasNextPage, startCursor, endCursor } =
    pageInfo ?? {}

  const entries = edges?.map(({ node }) => ({
    ...node,
    dateTitle: DateTime.fromISO(node.date).toFormat('DD')
  }))

  const handleInputValueChange = (inputValue: string) => {
    setDate(inputValue)
  }

  const handleNextPage = () => {
    setCursors({ after: endCursor, before: null })
    mutate()
  }

  const handlePrevPage = () => {
    setCursors({ before: startCursor, after: null })
    mutate()
  }

  const hasEntries = entries?.length > 0
  const isLoading = !hasEntries && isValidating

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

        <Stack direction={['column', 'row']} paddingTop='2'>
          <SingleDateSelector onInputValueChange={handleInputValueChange} />

          <HStack justifyContent={['center', 'flex-start']}>
            <Button
              onClick={handlePrevPage}
              leftIcon={<ChevronLeftIcon />}
              disabled={!hasPreviousPage}
              aria-label='Previous page'
            >
              Prev
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              rightIcon={<ChevronRightIcon />}
              aria-label='Next page'
            >
              Next
            </Button>
          </HStack>
        </Stack>
      </VStack>

      <HydrationSkeleton
        width='full'
        endColor='transparent'
        startColor='transparent'
      >
        <LearningJournalEntries isLoading={isLoading} entries={entries} />
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
