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
import { getLearningJournalPage, LEARNING_JOURNAL_PAGE_SIZE } from 'graphql/queries/getLearningJournalPage'

const initialDate = null
const initialPage = 1
function getSWRKey (page: number, date: string) {
  return `learning-journal/date:${date}/page:${page}`
}

export async function getStaticProps () {
  try {
    return {
      props: {
        fallback: {
          [getSWRKey(initialPage, initialDate)]: await getLearningJournalPage(initialPage, initialDate)
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

function calculatePagesCount (pageSize, totalCount) {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
}

function LearningJournalContent () {
  const [page, setPage] = useState(initialPage)
  const [date, setDate] = useState(initialDate)

  const {
    data: { edges, pageInfo, aggregate } = {},
    isValidating
  } = useSWR(getSWRKey(page, date), () =>
    getLearningJournalPage(page, date)
  )

  const { hasPreviousPage, hasNextPage } = pageInfo ?? {}
  const entries = edges?.map(({ node }) => ({
    ...node,
    dateTitle: DateTime.fromISO(node.date).toFormat('DD')
  }))
  const pagesCount = calculatePagesCount(LEARNING_JOURNAL_PAGE_SIZE, aggregate?.count)

  const handleDateInputValueChange = (inputValue: string) => {
    setDate(inputValue)
  }

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, pagesCount))
  }

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1))
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
          <SingleDateSelector onInputValueChange={handleDateInputValueChange} />

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
