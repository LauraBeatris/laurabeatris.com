import Image from 'next/image'
import { Flex } from '@chakra-ui/react'

import { ToggleThemeIcon } from 'components/Layout/ToggleThemeIcon'
import { Container } from 'components/Layout/Container'

import { HeaderNavigation } from './HeaderNavigation'
import { GradientLine } from '../GradientLine'

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
        <Flex marginRight={['auto', null, 'unset']}>
          <Image
            src='/images/logo.png'
            width={45}
            height={59}
            loading='eager'
          />
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
