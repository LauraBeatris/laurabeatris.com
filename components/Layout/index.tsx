import { Flex } from '@chakra-ui/react'

import { Header } from 'components/Layout/Header'

import { Container } from './Container'

export function Layout ({ children }) {
  return (
    <Flex
      direction='column'
      minHeight='200vh'
      backgroundColor='white.100'
    >
      <Header />

      <Container as='main'>
        {children}
      </Container>
    </Flex>
  )
}
