import { Box, BoxProps } from '@chakra-ui/react'

export function GradientCircle (props: BoxProps) {
  return (
    <Box
      borderRadius='full'
      bgGradient='linear(to-r, green.400, green.500, blue.100)'
      {...props}
    />
  )
}
