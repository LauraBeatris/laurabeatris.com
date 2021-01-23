import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Menu,
  Button,
  HStack,
  MenuList,
  MenuItem,
  MenuButton
} from '@chakra-ui/react'

import { Link } from 'components/UI/Link'
import { navigationItems } from 'constants/navigation'

const iconProps = { boxSize: '2em', color: 'white.100' }

export function HeaderNavigation () {
  return (
    <>
      <HStack
        as='ul'
        display={['none', null, 'flex']}
        spacing={4}
      >
        {
          navigationItems.map(({ name, href }) => (
            <Link key={name} href={href}>{name}</Link>
          ))
        }
      </HStack>

      <Menu>
        {
          ({ isOpen }) => (
            <>
              <MenuButton
                as={Button}
                display={['normal', null, 'none']}
                paddingX={2}
                variant='unstyled'
                backgroundColor='green.400'
              >
                {
                  isOpen
                    ? (<CloseIcon {...iconProps} boxSize='1em' />)
                    : (<HamburgerIcon {...iconProps} />)
                }
              </MenuButton>
              <MenuList>
                {
                  navigationItems.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      activeColor='green.400'
                      _hover={{ textDecoration: 'none' }}
                    >
                      <MenuItem
                        key={name}
                        _focus={{ backgroundColor: 'none' }}
                        _hover={{ backgroundColor: 'white.100' }}
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
