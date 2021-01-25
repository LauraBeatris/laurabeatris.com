import { List, HStack, ListIcon, ListItem, VStack, Box } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'

import { TimelineProps } from './types'

export function Timeline ({ timeline }: TimelineProps) {
  return (
    <VStack
      width='full'
      spacing={5}
      alignItems='flex-start'
    >
      <Heading as='h2' paddingTop={10}>
        Timeline
      </Heading>

      <List>
        {
          (timeline ?? []).map(({ year, achievements }) => (
            <ListItem key={year}>
              <Heading size='sm'>
                {year}
              </Heading>

              <List paddingY={4} spacing={5}>
                {(achievements ?? []).map(({ title, description }) => (
                  <ListItem key={title}>
                    <HStack
                      width='full'
                      alignItems='flex-start'
                      justifyContent='flex-start'
                    >
                      <Box
                        width={4}
                        height={4}
                        marginTop={1}
                        borderRadius='full'
                        bgGradient='linear(to-r, green.400, green.500, blue.100)'
                      />
                      <VStack
                        width='full'
                        spacing={2}
                        textAlign='left'
                      >
                        <Heading
                          width='full'
                          size='xs'
                          textAlign='left'
                        >
                          {title}
                        </Heading>

                        <Paragraph
                          size='sm'
                          width='full'
                          textAlign='left'
                        >
                          {description}
                        </Paragraph>
                      </VStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))
        }
      </List>
    </VStack>
  )
}
