import { List, HStack, ListItem, VStack, Box, Flex } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Paragraph } from 'components/Base/Paragraph'
import { gradients } from 'styles/theme/gradients'
import { Achievement } from '__generated__/graphql/schema'

type AchievementsProps = {
  achievements: Array<Pick<Achievement, 'id' | 'title' | 'description'>>
}

export function Achievements ({ achievements }: AchievementsProps) {
  return (
    <List paddingBottom={4}>
      {
        (achievements ?? []).map(({ id, title, description }, index) => {
          const isLastElement = index === achievements.length - 1
          const isFirstElement = index === 0
          const shouldConnectDots = achievements.length > 1

          return (
            <ListItem
              key={id}
              zIndex={1}
              paddingTop={4}
              position='relative'
            >
              {
                shouldConnectDots
                  ? <Flex
                      left='5px'
                      top={isFirstElement ? 5 : 0}
                      width='2.5px'
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
                  minWidth='14px'
                  height='14px'
                  marginTop={1}
                  borderRadius='full'
                  bgGradient={gradients.greenToBlue}
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
                    variant='regular'
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
