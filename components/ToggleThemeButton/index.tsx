import { useState } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import useSound from 'use-sound'

import switchOnSound from 'public/sounds/switch-on.mp3'
import switchOffSound from 'public/sounds/switch-off.mp3'

import { ToggleThemeIcon } from 'components/ToggleThemeIcon'

export function ToggleThemeButton (props: ButtonProps) {
  // TODO - Use color mode from Chakra UI
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [play] = useSound(isDarkTheme ? switchOnSound : switchOffSound)

  const handleClick = () => {
    setIsDarkTheme(prev => !prev)
    play()
  }

  const iconTitle = isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <Button
      onClick={handleClick}
      display='flex'
      variant='unstyled'
      alignItems='center'
      justifyContent='center'
      {...props}
    >
      <ToggleThemeIcon title={iconTitle} isDarkTheme={isDarkTheme} />
    </Button>
  )
}
