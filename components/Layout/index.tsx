import { Flex, useColorModeValue } from '@chakra-ui/react'

import { Header } from 'components/Layout/Header'

import { Container } from './Container'
import { Footer } from './Footer'

export function Layout ({ children }) {
  const backgroundColor = useColorModeValue('white.100', 'dark')

  return (
    <Flex
      direction='column'
      minHeight='100vh'
      backgroundColor={backgroundColor}
    >
      <Header />

      <Container as='main'>
        {children}
      </Container>

      <Footer />
    </Flex>
  )
}
