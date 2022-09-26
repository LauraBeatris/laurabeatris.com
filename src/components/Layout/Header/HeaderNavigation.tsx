import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Menu,
  Button,
  HStack,
  MenuList,
  MenuItem,
  MenuButton
} from '@chakra-ui/react'
import useSound from 'use-sound'

import { navigationItems } from 'constants/navigation'
import { Link } from 'components/Base/Link'

import menuOpenSound from '../../../../public/sounds/menu-open.mp3'

const iconProps = { boxSize: '2em', color: 'white.100' }

const HeaderNavigationDesktop = () => (
  <HStack
    as='ul'
    display={['none', null, 'flex']}
    spacing={4}
    css={{ listStyle: 'none' }}
  >
    {
      navigationItems.map(({ name, href, isExternal }) => (
        <li key={name}>
          <Link href={href} isExternal={isExternal}>{name}</Link>
        </li>
      ))
     }
  </HStack>
)

const HeaderNavigationMobile = () => {
  const [play] = useSound(menuOpenSound)

  const handleMenuClick = () => {
    play()
  }

  return (
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
              <MenuList backgroundColor='var(--header-mobile-menu-color)'>
                {
                  navigationItems.map(({ name, ...rest }) => (
                    <MenuItem
                      key={name}
                      padding={0}
                      _focus={{ backgroundColor: 'none' }}
                      _hover={{ backgroundColor: 'unset' }}
                    >
                      <Link
                        flex={1}
                        paddingX={4}
                        paddingY={2}
                        _hover={{ textDecoration: 'none', color: 'green.400' }}
                        {...rest}
                      >
                        {name}
                      </Link>
                    </MenuItem>
                  ))
                }
              </MenuList>
            </>
          )
        }
    </Menu>
  )
}

export function HeaderNavigation () {
  return (
    <>
      <HeaderNavigationDesktop />
      <HeaderNavigationMobile />
    </>
  )
}
