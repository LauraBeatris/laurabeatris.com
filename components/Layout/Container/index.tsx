import { ContainerProps } from '@chakra-ui/react'

export function Container ({ children, ...rest }: ContainerProps) {
  return (
    <Container
      as='main'
      maxW='3xl'
      paddingX={8}
      paddingBottom={8}
      {...rest}
    >
      {children}
    </Container>
  )
}
