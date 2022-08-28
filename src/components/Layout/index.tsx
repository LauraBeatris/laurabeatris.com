import { Flex } from '@chakra-ui/react'

import { Header } from 'components/Layout/Header'

import { Container } from './Container'
import { Footer } from './Footer'

export function Layout ({ children }) {
  return (
    <Flex
      direction='column'
      minHeight='100vh'
      backgroundColor='var(--app-background-color)'
    >
      <Header />

      <Container as='main'>
        {children}
      </Container>

      <Footer />
    </Flex>
  )
}
