import { highlightLinkStyles, highlightLinkThemeKey } from 'components/HighlightLink'
import { headingStyles, headingThemeKey } from 'components/Heading'
import { paragraphStyles, paragraphThemeKey } from 'components/Paragraph'

export const components = {
  [headingThemeKey]: headingStyles,
  [paragraphThemeKey]: paragraphStyles,
  [highlightLinkThemeKey]: highlightLinkStyles
}
