import { css } from '@emotion/react'

import { colors } from './theme/colors'

export const global = css`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url(/fonts/inter-var-latin.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }

  ::selection {
    background-color: ${colors.green[400]};
    color: ${colors.white[100]};
  }

  .next-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;

    &---contained {
      object-fit: contain;
    }
  }
`
