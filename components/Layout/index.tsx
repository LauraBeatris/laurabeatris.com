import { Flex } from '@chakra-ui/react'

import { Header } from 'components/Layout/Header'

import { GradientLine } from './GradientLine'
import { Container } from './Container'

export function Layout ({ children }) {
  return (
    <Flex
      direction='column'
      minHeight='200vh'
      backgroundColor='white.100'
      justifyContent='space-between'
    >
      <Flex direction='column'>
        <GradientLine />
        <Container>
          <Header />
        </Container>
      </Flex>

      <Container as='main'>
        {children}
      </Container>

      <GradientLine />
    </Flex>
  )
}
