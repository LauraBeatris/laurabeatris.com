export const PARAGRAPH_THEME_KEY = 'Paragraph'

export const paragraphStyles = {
  baseStyle: {
    color: 'var(--text-color)',
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
      color: 'var(--gray-paragraph-variant-color)',
      fontWeight: 400
    }
  },
  defaultProps: {
    size: 'md'
  }
}
