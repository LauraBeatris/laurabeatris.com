import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Menu,
  Button,
  HStack,
  MenuList,
  MenuItem,
  MenuButton,
  useColorModeValue
} from '@chakra-ui/react'
import useSound from 'use-sound'

import { Link } from 'components/Base/Link'
import { navigationItems } from 'constants/navigation'
import menuOpenSound from 'public/sounds/menu-open.mp3'

const iconProps = { boxSize: '2em', color: 'white.100' }

export function HeaderNavigation () {
  const [play] = useSound(menuOpenSound)

  const handleMenuClick = () => {
    play()
  }

  const menuBackgroundColor = useColorModeValue('white.100', 'dark')

  return (
    <>
      <HStack
        as='ul'
        display={['none', null, 'flex']}
        spacing={4}
        css={{ listStyle: 'none' }}
      >
        {
          navigationItems.map(({ name, href }) => (
            <li key={name}>
              <Link href={href}>{name}</Link>
            </li>
          ))
        }
      </HStack>

      <Menu>
        {
          ({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                display={['flex', null, 'none']}
                variant='unstyled'
                onClick={handleMenuClick}
                paddingX={2}
                alignItems='center'
                justifyContent='center'
                backgroundColor='green.400'
              >
                {
                  isOpen
                    ? (<CloseIcon {...iconProps} boxSize='1em' />)
                    : (<HamburgerIcon {...iconProps} />)
                }
              </MenuButton>
              <MenuList backgroundColor={menuBackgroundColor}>
                {
                  navigationItems.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      activeColor='green.400'
                      _hover={{ textDecoration: 'none', color: 'green.400' }}
                    >
                      <MenuItem
                        key={name}
                        _focus={{ backgroundColor: 'none' }}
                        _hover={{ backgroundColor: 'unset' }}
                      >
                        {name}
                      </MenuItem>
                    </Link>
                  ))
                }
              </MenuList>
            </>
          )
        }
      </Menu>
    </>
  )
}
