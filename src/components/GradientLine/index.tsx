import { Box } from '@chakra-ui/react'

export function GradientLine () {
  return (
    <Box
      width='full'
      height={4}
      bgGradient='linear(to-r, green.400, green.500, green.400, blue.100)'
    />
  )
}
