import { paragraphStyles } from 'components/Base/Paragraph/styles'

const { sizes } = paragraphStyles

export const HIGHLIGHT_LINK_THEME_KEY = 'HighlightLink'

export const highlightLinkStyles = {
  baseStyle: {
    color: 'green.400',
    fontWeight: 500,
    textDecoration: 'underline'
  },
  sizes,
  defaultProps: {
    size: 'md'
  }
}
