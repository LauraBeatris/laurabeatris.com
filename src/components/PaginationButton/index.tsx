import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Text, ButtonProps } from '@chakra-ui/react'

export type PaginationButtonProps = ButtonProps & {
  showMore: boolean;
}

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
      <Text>{text}</Text>

      <Icon />
    </Button>
  )
}
