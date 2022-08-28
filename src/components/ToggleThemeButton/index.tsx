import useSound from 'use-sound'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useColorMode } from '@laurabeatris/chakra-ui-flashless'

import { ToggleThemeIcon } from 'components/ToggleThemeIcon'
import { HydrationSkeleton } from 'components/Base/HydrationSkeleton'
import { useHasMounted } from 'hooks/useHasMounted'

import switchOffSound from '../../../public/sounds/switch-off.mp3'
import switchOnSound from '../../../public/sounds/switch-on.mp3'

export function ToggleThemeButton (props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { hasMounted } = useHasMounted()

  const isDarkMode = colorMode === 'dark'
  const [play] = useSound(isDarkMode ? switchOnSound : switchOffSound)

  const handleClick = () => {
    toggleColorMode()
    play()
  }

  const iconTitle = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <HydrationSkeleton
      endColor='transparent'
      isLoaded={hasMounted}
      startColor='transparent'
    >
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
    </HydrationSkeleton>
  )
}
