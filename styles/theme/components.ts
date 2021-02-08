import { highlightLinkStyles, HIGHLIGHT_LINK_THEME_KEY } from 'components/Base/HighlightLink/styles'
import { headingStyles, HEADING_THEME_KEY } from 'components/Base/Heading/styles'
import { paragraphStyles, PARAGRAPH_THEME_KEY } from 'components/Base/Paragraph/styles'

export const components = {
  [HEADING_THEME_KEY]: headingStyles,
  [PARAGRAPH_THEME_KEY]: paragraphStyles,
  [HIGHLIGHT_LINK_THEME_KEY]: highlightLinkStyles
}
