import {
  Popover as ChakraPopover,
  Button,
  PopoverBody,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  useColorModeValue
} from '@chakra-ui/react'
import useSound from 'use-sound'

import { Paragraph } from 'components/Base/Paragraph'
import menuOpenSound from 'public/sounds/menu-open.mp3'

import { PopoverProps } from './types'

export function Popover ({ buttonContent, popoverText, ...rest }: PopoverProps) {
  const [play] = useSound(menuOpenSound, { volume: 0.2 })
  const contentBackgroundColor = useColorModeValue('dark', 'white.100')
  const closeButtonColor = useColorModeValue('white.100', 'dark')
  const paragraphVariant = useColorModeValue('light', 'dark')

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
      <PopoverContent backgroundColor={contentBackgroundColor}>
        <PopoverArrow backgroundColor={contentBackgroundColor} />
        <PopoverCloseButton color={closeButtonColor} />
        <PopoverBody>
          <Paragraph
            size='sm'
            variant={paragraphVariant}
            useColorModeVariant={false}
          >
            {popoverText}
          </Paragraph>
        </PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  )
}
