import { ArrowRightIcon } from '@chakra-ui/icons'
import { Stack, Text, VStack } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { SWRConfig } from 'swr'

import { Heading } from 'components/Base/Heading'
import { HighlightLink } from 'components/Base/HighlightLink'
import { Paragraph } from 'components/Base/Paragraph'
import { ProjectsList } from 'components/ProjectsList'
import { links } from 'constants/links'
import { getHomePage } from 'graphql/queries/getHomePage'
import { getTimeline } from 'graphql/queries/getTimeline'
import { gradients } from 'styles/theme/gradients'
import { getDayOfWeek } from 'utils/getDayOfWeek'

const { clerk } = links

const now = new Date()
const dayOfWeek = getDayOfWeek(now.getDate(), now.getMonth(), now.getFullYear())
const GreenArrowRightIcon = () => <ArrowRightIcon color='green.400' style={{ width: 10 }} />

type HomeContainerProps = InferGetStaticPropsType<typeof getStaticProps>

export async function getStaticProps () {
  try {
    const { stackCategories, initialProjects } = await getHomePage()
    const timeline = await getTimeline()

    return {
      props: {
        timeline,
        initialProjects,
        stackCategories
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

type HomeContentProps = Pick<HomeContainerProps, 'timeline' | 'stackCategories' | 'initialProjects'>
function HomeContent ({ timeline, initialProjects }: HomeContentProps) {
  return (
    <VStack
      width='full'
      alignItems='flex-start'
      paddingTop={5}
      paddingBottom={10}
    >
      <Heading as='h1'>
        Happy {dayOfWeek}!
        <br />
        I'm Laura Beatris
      </Heading>

      <VStack spacing={0} width='full' alignItems='flex-start'>
        <Paragraph variant='regular'>
          Product Engineer at <HighlightLink href={clerk.href}>{clerk.label}</HighlightLink>
        </Paragraph>

        <Stack direction={['column', 'row']} spacing={[-1, 1]}>
          <Paragraph variant='regular'>
            Following the flow of
          </Paragraph>
          <Paragraph display='inline'>
            <Text
              bgClip='text'
              bgGradient={gradients.greenToBlue}
            >
              learning <GreenArrowRightIcon /> creating <GreenArrowRightIcon /> teaching 🚀
            </Text>
          </Paragraph>
        </Stack>
      </VStack>

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore-error */}
      <ProjectsList initialProjects={initialProjects} />
    </VStack>
  )
}

export default function HomeContainer ({
  timeline,
  initialProjects,
  stackCategories
}: HomeContainerProps) {
  return (
    <SWRConfig>
      <HomeContent initialProjects={initialProjects} timeline={timeline} stackCategories={stackCategories} />
    </SWRConfig>
  )
}
