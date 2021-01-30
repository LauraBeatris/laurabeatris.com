import { InferGetServerSidePropsType } from 'next'
import { List, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { getLearningJournals } from 'graphql/queries/getLearningJournals'
import { ChakraProvider } from 'providers/ChakraProvider'
import { usePagination } from 'hooks/usePagination'
import { PaginationButton } from 'components/PaginationButton'
import { LearningJournal as LearningJournalSchemaType } from 'graphql/schema'

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

type FormattedLearningJournal = Omit<LearningJournalSchemaType, 'date'> & {
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
              dateTitle,
              curiosity,
              programming
            }) => {
              const shouldShowWorkEntries = (work ?? []).length > 0
              const shouldShowCuriosityEntries = (curiosity ?? []).length > 0
              const shouldShowProgrammingEntries = (programming ?? []).length > 0

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

                  {
                    shouldShowWorkEntries
                      ? (
                        <>
                          <Heading size='xs'>Work</Heading>
                          <UnorderedList paddingLeft={5}>
                            {
                              work.map(text => (
                                <ListItem key={text}>{text}</ListItem>
                              ))
                            }
                          </UnorderedList>
                        </>
                        )
                      : null
                  }

                  {
                    shouldShowProgrammingEntries
                      ? (
                        <>
                          <Heading size='xs'>Programming</Heading>
                          <UnorderedList paddingLeft={5}>
                            {
                              programming.map(text => (
                                <ListItem key={text}>{text}</ListItem>
                              ))
                            }
                          </UnorderedList>
                        </>
                        )
                      : null
                  }

                  {
                    shouldShowCuriosityEntries
                      ? (
                        <>
                          <Heading size='xs'>Curiosity</Heading>
                          <UnorderedList paddingLeft={5}>
                            {
                              curiosity.map(text => (
                                <ListItem key={text}>{text}</ListItem>
                              ))
                            }
                          </UnorderedList>
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
