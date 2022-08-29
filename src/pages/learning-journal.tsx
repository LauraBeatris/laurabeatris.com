import { useState } from 'react'
import {
  Button,
  Flex,
  HStack,
  Link,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon } from '@chakra-ui/icons'
import { DateTime } from 'luxon'
import useSWR, { SWRConfig, unstable_serialize } from 'swr'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { LearningJournalList } from 'components/LearningJournalList'
import { SingleDateSelector } from 'components/SingleDateSelector'
import { HydrationSkeleton } from 'components/Base/HydrationSkeleton'
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

function LearningJournalContent () {
  const [date, setDate] = useState<string>()
  const [endCursor, setEndCursor] = useState()

  const { data: { edges, pageInfo } = {}, isValidating } = useSWR(
    ['learning-journal-page', date, endCursor],
    () => getLearningJournalPage({ date, after: endCursor, before: undefined })
  )

  const formattedEntries = edges?.map(({ node: { date, ...rest } }) => ({
    ...rest,
    dateTitle: DateTime.fromISO(date).toFormat('DD')
  }))

  const handleInputValueChange = (inputValue: string) => {
    setDate(inputValue)
  }

  const handleNextPage = () => {
    setEndCursor(pageInfo.endCursor)
  }

  const hasEntries = formattedEntries?.length > 0 && !isValidating

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
              leftIcon={<ChevronLeftIcon />}
              onClick={handleNextPage}
              aria-label='Previous page'
            >
              Prev
            </Button>
            <Button
              onClick={handleNextPage}
              rightIcon={<ChevronRightIcon />}
              aria-label='Next page'
            >
              Next
            </Button>
          </HStack>
        </Stack>
      </VStack>

      <Skeleton
        width='full'
        flexGrow={1}
        minHeight='400px'
        borderRadius={4}
        isLoaded={!isValidating}
      >
        <HydrationSkeleton
          width='full'
          endColor='transparent'
          startColor='transparent'
        >
          {hasEntries
            ? (
              <VStack>
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
              </VStack>
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
      </Skeleton>
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
