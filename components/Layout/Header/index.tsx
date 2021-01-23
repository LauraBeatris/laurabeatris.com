import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

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
      <Image
        src='/images/logo.png'
        width={45}
        height={59}
      />

      <HeaderNavigation />
    </Flex>
  )
}
