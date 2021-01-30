export const PARAGRAPH_THEME_KEY = 'Paragraph'

export const paragraphStyles = {
  baseStyle: {
    color: 'gray.300',
    fontWeight: 500
  },
  sizes: {
    md: {
      fontSize: '1.3rem'
    },
    sm: {
      fontSize: '1rem'
    }
  },
  variants: {
    regular: {
      fontWeight: 400
    },
    light: {
      color: 'white.100'
    },
    dark: {
      color: 'gray.300'
    }
  },
  defaultProps: {
    size: 'md'
  }
}
