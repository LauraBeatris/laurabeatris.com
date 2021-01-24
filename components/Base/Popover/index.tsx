import {
  Popover as ChakraPopover,
  Button,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton
} from '@chakra-ui/react'

import { Paragraph } from 'components/Base/Paragraph'

import { PopoverProps } from './types'

export function Popover ({ buttonContent, popoverText, ...rest }: PopoverProps) {
  return (
    <ChakraPopover
      aria-label={popoverText}
      placement='top'
      {...rest}
    >
      <PopoverTrigger>
        <Button
          height='unset'
          variant='unstyled'
          minWidth='unset'
          marginLeft={2}
        >
          {buttonContent}
        </Button>
      </PopoverTrigger>
      <PopoverContent backgroundColor='dark'>
        <PopoverArrow backgroundColor='dark' />
        <PopoverCloseButton color='white.100' />
        <PopoverBody>
          <Paragraph variant='white' size='sm'>
            {popoverText}
          </Paragraph>
        </PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  )
}
