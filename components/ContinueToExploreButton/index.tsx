import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Text, ButtonProps } from '@chakra-ui/react'

export function ContinueToExploreButton (props: ButtonProps) {
  return (
    <Button
      display='flex'
      variant='unstyled'
      flexDirection='column'
      {...props}
    >
      <Text color='dark'>Continue to explore</Text>

      <ChevronDownIcon />
    </Button>
  )
}
