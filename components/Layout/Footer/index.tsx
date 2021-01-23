import { Link, Flex, Image, HStack, VStack } from '@chakra-ui/react'

import { Heading } from 'components/Base/Heading'
import { Container } from 'components/Layout/Container'
import { GradientLine } from 'components/GradientLine'
import { links } from 'constants/links'

const footerLinks = [
  {
    href: links.github,
    imageSrc: '/images/icons/github.png'
  },
  {
    href: links.linkedin,
    imageSrc: '/images/icons/linkedin.png'
  },
  {
    href: links.youtube,
    imageSrc: '/images/icons/youtube.png'
  },
  {
    href: links.twitter,
    imageSrc: '/images/icons/twitter.png'
  }
]

export function Footer () {
  return (
    <Flex
      width='full'
      marginTop='auto'
      direction='column'
      borderTopWidth={2}
    >
      <Container>
        <VStack
          as='footer'
          width='full'
          spacing={4}
          paddingY={8}
          alignItems='center'
          justifyContent='center'
        >
          <Heading
            size='xs'
            width='100%'
            maxWidth={420}
            textAlign='center'
          >
            Keep connected with my work by following me on
          </Heading>

          <HStack
            spacing={2}
            alignItems='flex-end'
            justifyContent='center'
          >
            {
                footerLinks.map(({ imageSrc, href }) => (
                  <Link key={href} href={href} isExternal>
                    <Image width={5} src={imageSrc} />
                  </Link>
                ))
              }
          </HStack>
        </VStack>
      </Container>
      <GradientLine />
    </Flex>
  )
}
