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
      <HStack display={['none', null, 'flex']} as='ul' spacing={4}>
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
                paddingX={2}
                variant='unstyled'
                backgroundColor='green.400'
                display={['normal', null, 'none']}
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
                    <MenuItem key={name} color='dark'>
                      <Link activeColor='green.400' key={name} href={href}>{name}</Link>
                    </MenuItem>
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
