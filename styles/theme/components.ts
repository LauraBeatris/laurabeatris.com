import { highlightLinkStyles, highlightLinkThemeKey } from 'components/Base/HighlightLink'
import { headingStyles, headingThemeKey } from 'components/Base/Heading'
import { paragraphStyles, paragraphThemeKey } from 'components/Base/Paragraph'

export const components = {
  [headingThemeKey]: headingStyles,
  [paragraphThemeKey]: paragraphStyles,
  [highlightLinkThemeKey]: highlightLinkStyles
}
