import { Flex, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import hexToRgba from 'hex-to-rgba'

import { Container } from 'components/Layout/Container'
import { GradientLine } from 'components/GradientLine'

import { colors } from 'styles/theme/colors'

import { ToggleThemeButton } from 'components/ToggleThemeButton'

import { HeaderNavigation } from './HeaderNavigation'

export function Header () {
  const backgroundColor = useColorModeValue(
    hexToRgba(colors.white[100], 0.5),
    hexToRgba(colors.dark, 0.5)
  )

  return (
    <Flex
      as='header'
      top={0}
      css={{ backdropFilter: 'saturate(180%) blur(20px)' }}
      width='full'
      zIndex='docked'
      position='sticky'
      direction='column'
      backgroundColor={backgroundColor}
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
