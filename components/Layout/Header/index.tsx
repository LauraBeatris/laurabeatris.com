import Image from 'next/image'
import { Flex } from '@chakra-ui/react'

import { ToggleThemeIcon } from 'components/Layout/ToggleThemeIcon'

import { HeaderNavigation } from './HeaderNavigation'

export function Header () {
  return (
    <Flex
      as='header'
      top={0}
      css={{ backdropFilter: 'saturate(180%) blur(20px)' }}
      width='full'
      zIndex='docked'
      paddingY={8}
      position='sticky'
      alignItems='center'
      justifyContent='space-between'
    >
      <Flex marginRight={['auto', null, 'unset']}>
        <Image
          src='/images/logo.png'
          width={45}
          height={59}
        />
      </Flex>

      <HeaderNavigation />
      <ToggleThemeIcon
        title='Switch to dark mode'
        marginLeft={[2, null, 'unset']}
      />
    </Flex>
  )
}
