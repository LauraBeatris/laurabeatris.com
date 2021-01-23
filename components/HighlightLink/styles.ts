import { paragraphStyles } from 'components/Paragraph'

const { sizes } = paragraphStyles

export default {
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
