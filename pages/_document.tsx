import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { getColor } from '@chakra-ui/theme-tools'

import { colors } from 'styles/theme/colors'
import { theme } from 'styles/theme'

// a helper function to create color variables given a variable name and theme keys
function createVar (name, light, dark) {
  return `
    root.style.setProperty(
      '${name}',
      mql.matches
        ? '${getColor(theme, dark)}'
        : '${getColor(theme, light)}'
    );
  `
}

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            crossOrigin='anonymous'
          />
          <link href='favicons/site.webmanifest' rel='manifest' />
          <link rel='icon' type='image/png' href='/favicons/favicon-32x32.png' sizes='32x32' />
          <link rel='icon' type='image/png' href='/favicons/favicon-16x16.png' sizes='16x16' />
          <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
          <meta name='application-name' content='&nbsp;' />
          <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
          <meta name='msapplication-TileColor' content={colors.white[100]} />
          <meta name='msapplication-TileImage' content='mstile-144x144.png' />
          <meta
            content='/favicons/browserconfig.xml'
            name='msapplication-config'
          />
          <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color={colors.white[100]} />
        </Head>
        <body>
          <script
            key='cm'
            dangerouslySetInnerHTML={{
              __html: `
          const mql = window.matchMedia('(prefers-color-scheme: dark)');
          const root = document.documentElement;
          ${createVar('--bg-color', 'dark', 'white.100')}
          ${createVar('--text-color', 'dark', 'white.100')}
          ${createVar('--placeholder-text-color', 'dark', 'white.100')}
          ${createVar('--border-color', 'dark', 'white.100')}
          ${createVar('--button-text-color', 'dark', 'white.100')}
        `
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
