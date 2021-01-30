export const HEADING_THEME_KEY = 'Heading'

export const headingStyles = {
  baseStyle: {
    fontWeight: 'bold',
    color: 'dark'
  },
  sizes: {
    lg: {
      fontSize: '2.5rem'
    },
    md: {
      fontSize: '1.8rem'
    },
    sm: {
      fontSize: '1.5rem'
    },
    xs: {
      fontSize: '1.2rem'
    }
  },
  variants: {
    light: {
      color: 'white.100'
    },
    dark: {
      color: 'dark'
    }
  },
  defaultProps: {
    size: 'lg'
  }
}
