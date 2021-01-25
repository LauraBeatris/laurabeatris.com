import { InferGetStaticPropsType } from 'next'
import { List, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { getLearningJournals } from 'graphql/queries/getLearningJournal'

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

export default function LearningJournal ({
  learningJournals
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const formatLearningJournals = learningJournals.map(({ date, ...rest }) => ({
    ...rest,
    date: new Date(date).toDateString()
  }))

  return (
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

      <List width='full' paddingTop={5} spacing={6}>
        {
          (formatLearningJournals ?? []).map(({
            id,
            date,
            work,
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
              >
                <Text
                  as='h3'
                  bgClip='text'
                  fontSize={22}
                  fontWeight='bold'
                  bgGradient='linear(to-r, green.400, green.500, blue.100)'
                >
                  {date}
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
    </VStack>
  )
}
