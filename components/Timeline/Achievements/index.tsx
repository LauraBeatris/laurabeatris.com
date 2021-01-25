import { List, HStack, ListItem, VStack, Box, Flex } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'

import { AchievementsProps } from './types'

export function Achievements ({ achievements }: AchievementsProps) {
  return (
    <List paddingY={4}>
      {
        (achievements ?? []).map(({ title, description }, index) => {
          const isLastElement = index === achievements.length - 1
          const isFirstElement = index === 0
          const shouldConnectDots = achievements.length > 1

          return (
            <ListItem
              key={title}
              zIndex={1}
              paddingTop={4}
              position='relative'
            >
              {
                shouldConnectDots
                  ? <Flex
                      left='5px'
                      top={isFirstElement ? 5 : 0}
                      width={1}
                      bottom={0}
                      height={isLastElement ? 5 : 'unset'}
                      zIndex={-1}
                      position='absolute'
                      backgroundColor='gray.100'
                    />
                  : null
                }

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
          )
        })
      }
    </List>
  )
}
