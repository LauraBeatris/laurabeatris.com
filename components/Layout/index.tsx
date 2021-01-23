import { Flex, Container } from '@chakra-ui/react'

import { Header } from 'components/Layout/Header'

export function Layout ({ children }) {
  return (
    <Flex minHeight='100vh' backgroundColor='white.100'>
      <Container
        as='main'
        maxW='3xl'
        paddingX={8}
        paddingBottom={8}
      >
        <Header />

        {children}
      </Container>
    </Flex>
  )
}
