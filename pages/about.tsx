import { VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { HighlightLink } from 'components/Base/HighlightLink'
import { Paragraph } from 'components/Base/Paragraph'
import { PlaceImage } from 'components/PlaceImage'
import { ChakraProvider } from 'providers/ChakraProvider'

export async function getServerSideProps ({ req }) {
  try {
    return {
      props: {
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

export default function About ({ cookies }) {
  return (
    <ChakraProvider cookies={cookies}>
      <VStack
        width='full'
        spacing={10}
        paddingTop={5}
        paddingBottom={10}
        alignItems='flex-start'
      >
        <VStack
          width='full'
          spacing={5}
          alignItems='flex-start'
        >
          <Heading as='h2'>About my life 🏝</Heading>
          <Paragraph>
            I was born in <HighlightLink href='https://pt.wikipedia.org/wiki/Rio_Grande_(Rio_Grande_do_Sul)'>Rio Grande</HighlightLink>{' '}
            and have been living in <HighlightLink href='https://pt.wikipedia.org/wiki/Florian%C3%B3polis'>Florianópolis</HighlightLink> for 15 years.
          </Paragraph>

          <PlaceImage
            name='Florianópolis'
            imageSrc='/images/florianopolis.jpg'
            startYear={2008}
          />

          <PlaceImage
            name='Rio Grande'
            endYear={2008}
            imageSrc='/images/rio-grande.jpg'
            startYear={2002}
          />
        </VStack>

        <VStack
          width='full'
          spacing={5}
          alignItems='flex-start'
        >
          <Heading as='h2'>Hobbies 🎶🎮</Heading>
          <Paragraph>
            Since children, I love to express my feeling with music.
            I started to play violin when I was 12 years old and I'm currently learning piano. 🎹
          </Paragraph>
          <Paragraph>
            I also love video games because of the possibility of interacting with people from all over the worlds.
          </Paragraph>
        </VStack>

        <VStack
          width='full'
          spacing={5}
          alignItems='flex-start'
        >
          <Heading as='h2'>Programming Journey 💻</Heading>
          <Paragraph>
            When I was on high school, wondering what would be my major,
            I've saw on technology a opportunity to meet people from all over the world and that's why I decided to start studying Python and programming fundamentals even before starting college.
          </Paragraph>
          <Paragraph>
            When I started a Bachelor's Degree in Analysis and Systems Development, I
            often would get home everyday and put everything that I learned on my GitHub profile, and this helped a lot to land my first job as a Full Stack Developer.
          </Paragraph>
          <Paragraph>
            Since I started to program, I'm a real believer in learning in public and
            I always try to share the knowledge that I gained throughout my journey with the community.
          </Paragraph>
        </VStack>
      </VStack>
    </ChakraProvider>
  )
}
