import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import { ToggleThemeIcon } from 'components/ToggleThemeIcon'
import { Container } from 'components/Layout/Container'
import { GradientLine } from 'components/GradientLine'

import { HeaderNavigation } from './HeaderNavigation'

export function Header () {
  return (
    <Flex
      as='header'
      top={0}
      css={{ backdropFilter: 'saturate(180%) blur(20px)' }}
      width='full'
      zIndex='docked'
      position='sticky'
      direction='column'
    >
      <GradientLine />
      <Container
        width='full'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        paddingY={8}
      >
        <Flex
          title='Click to go to home'
          cursor='pointer'
          marginRight={['auto', null, 'unset']}
        >
          <Link href='/'>
            <Image
              src='/images/logo.png'
              width={45}
              height={59}
              loading='eager'
            />
          </Link>
        </Flex>

        <HeaderNavigation />
        <ToggleThemeIcon
          title='Switch to dark mode'
          marginLeft={[2, null, 'unset']}
        />
      </Container>
    </Flex>
  )
}
