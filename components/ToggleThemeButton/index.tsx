import { Button, ButtonProps, useColorMode } from '@chakra-ui/react'
import useSound from 'use-sound'

import switchOnSound from 'public/sounds/switch-on.mp3'
import switchOffSound from 'public/sounds/switch-off.mp3'

import { ToggleThemeIcon } from 'components/ToggleThemeIcon'

export function ToggleThemeButton (props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  const isDarkMode = colorMode === 'dark'
  const [play] = useSound(isDarkMode ? switchOnSound : switchOffSound)

  const handleClick = () => {
    toggleColorMode()
    play()
  }

  const iconTitle = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <Button
      onClick={handleClick}
      display='flex'
      variant='unstyled'
      alignItems='center'
      justifyContent='center'
      {...props}
    >
      <ToggleThemeIcon title={iconTitle} isDarkMode={isDarkMode} />
    </Button>
  )
}
