import { highlightLinkStyles, highlightLinkThemeKey } from 'components/UI/HighlightLink'
import { headingStyles, headingThemeKey } from 'components/UI/Heading'
import { paragraphStyles, paragraphThemeKey } from 'components/UI/Paragraph'

export const components = {
  [headingThemeKey]: headingStyles,
  [paragraphThemeKey]: paragraphStyles,
  [highlightLinkThemeKey]: highlightLinkStyles
}
