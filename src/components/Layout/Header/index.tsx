import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from 'components/Layout/Container'
import { GradientLine } from 'components/GradientLine'
import { ToggleThemeButton } from 'components/ToggleThemeButton'

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
      backgroundColor='var(header-background)'
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
            {/* Should wrap functional component with element due to this
              issue of next/link https://github.com/vercel/next.js/issues/7915 */}
            <div>
              <Image
                alt='Laura Beatris Logo'
                src='/images/logo.png'
                width={45}
                height={59}
                priority
              />
            </div>
          </Link>
        </Flex>

        <HeaderNavigation />

        <ToggleThemeButton marginLeft={[2, null, 'unset']} />
      </Container>
    </Flex>
  )
}
