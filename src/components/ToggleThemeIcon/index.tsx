import { Flex, FlexProps } from '@chakra-ui/react'

import { theme } from 'styles/theme'

const { colors } = theme

type ToggleThemeIconProps = FlexProps & {
  title: string;
  isDarkMode?: boolean;
}

export function ToggleThemeIcon ({
  title,
  isDarkMode,
  ...rest
}: ToggleThemeIconProps) {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      {...rest}
    >
      <svg
        width='43'
        height='43'
        viewBox='0 0 43 43'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title>{title}</title>
        <rect width='43' height='43' fill={colors.transparent} />
        <path
          d='M17.3845 5.00788L22.2223 7.40366L27.236 5.7566L29.8836 10.6416L34.9421 12.4283L34.3883 17.9366L37.5593 22.4746L34.0156 26.5023L34.0879 32.0582L28.9079 33.0668L25.8539 37.5184L21.0161 35.1227L16.0024 36.7697L13.3547 31.8847L8.2963 30.098L8.85009 24.5897L5.67909 20.0517L9.22281 16.0241L9.15046 10.4681L14.3305 9.45957L17.3845 5.00788Z'
          fill={isDarkMode ? colors.transparent : colors.yellow[100]}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.8701 29.2225L14.8301 29.2695C16.8767 31.0106 19.5312 31.8674 22.2096 31.6514C24.8879 31.4353 27.3708 30.1642 29.1119 28.1175C30.853 26.0709 31.7098 23.4164 31.4938 20.738C31.2804 18.0931 30.0381 15.6388 28.0362 13.9012C30.6485 18.2046 29.0446 24.1737 24.2972 27.465C21.3419 29.5138 17.8423 30.0579 14.8701 29.2225Z'
          fill={isDarkMode ? colors.gray[200] : colors.yellow[200]}
        />
      </svg>
    </Flex>
  )
}
