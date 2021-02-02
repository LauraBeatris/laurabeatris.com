import { InferGetServerSidePropsType } from 'next'
import { Link, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { PaginationButton } from 'components/PaginationButton'
import { LearningJournalList } from 'components/LearningJournalList'
import { getLearningJournals } from 'graphql/queries/getLearningJournals'
import { ChakraProvider } from 'providers/ChakraProvider'
import { usePagination } from 'hooks/usePagination'
import { LearningJournal as LearningJournalType } from 'graphql/schema'

export async function getServerSideProps ({ req }) {
  try {
    const learningJournals = await getLearningJournals()

    return {
      props: {
        learningJournals,
        cookies: req.headers.cookie ?? ''
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
  cookies,
  learningJournals
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const formattedLearningJournals = learningJournals.map(({ date, ...rest }) => ({
    ...rest,
    dateTitle: new Date(date).toDateString()
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
    <ChakraProvider cookies={cookies}>
      <VStack
        width='full'
        paddingTop={5}
        paddingBottom={10}
        alignItems='flex-start'
      >
        <Heading as='h2'>Learning Journal</Heading>

        <Paragraph variant='regular'>
          Documenting my learning journey throughout the years.
        </Paragraph>

        <List
          width='full'
          spacing={6}
          paddingTop={5}
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
                    bgGradient='linear(to-r, green.400, green.500, blue.100)'
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
                                    bgGradient='linear(to-r, green.400, green.500, blue.100)'
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

        <PaginationButton
          showMore={hasMoreItems}
          onClick={handlePagination}
          alignSelf='center'
        />
      </VStack>
    </ChakraProvider>
  )
}
