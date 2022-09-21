import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Button, Text, ButtonProps, Spinner } from '@chakra-ui/react'

export type PaginationButtonProps = ButtonProps & {
  showMore: boolean;
}

export function PaginationButton ({
  showMore,
  isLoading,
  disabled,
  ...rest
}: PaginationButtonProps) {
  const text = showMore ? 'Show more' : 'Show less'

  const Icon = showMore ? ChevronDownIcon : ChevronUpIcon

  return (
    <Button
      display='flex'
      variant='unstyled'
      disabled={disabled}
      flexDirection='column'
      {...rest}
    >
      <Text>{text}</Text>

      {isLoading ? <Spinner size='xs' /> : <Icon />}
    </Button>
  )
}
