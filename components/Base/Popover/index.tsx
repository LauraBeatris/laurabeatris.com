import {
  Popover as ChakraPopover,
  Button,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton
} from '@chakra-ui/react'
import useSound from 'use-sound'

import { Paragraph } from 'components/Base/Paragraph'
import menuOpenSound from 'public/sounds/menu-open.mp3'

import { PopoverProps } from './types'

export function Popover ({ buttonContent, popoverText, ...rest }: PopoverProps) {
  const [play] = useSound(menuOpenSound, { volume: 0.2 })

  const handleClick = () => {
    play()
  }

  return (
    <ChakraPopover
      aria-label={popoverText}
      placement='top'
      {...rest}
    >
      <PopoverTrigger>
        <Button
          height='unset'
          onClick={handleClick}
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
