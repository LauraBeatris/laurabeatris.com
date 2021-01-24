import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'

import { PaginationButtonProps } from './types'

export function PaginationButton ({
  showMore,
  ...rest
}: PaginationButtonProps) {
  const text = showMore ? 'Show more' : 'Show less'

  const Icon = showMore ? ChevronDownIcon : ChevronUpIcon

  return (
    <Button
      display='flex'
      variant='unstyled'
      flexDirection='column'
      {...rest}
    >
      <Text color='dark'>{text}</Text>

      <Icon />
    </Button>
  )
}
