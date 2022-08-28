import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

import { FlashlessScript } from '@laurabeatris/chakra-ui-flashless'

import { theme } from 'styles/theme'
import { colorModeVariables } from 'styles/theme/colorModeVariables'

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
          <meta name='msapplication-TileColor' content={theme.colors.white[100]} />
          <meta name='msapplication-TileImage' content='mstile-144x144.png' />
          <meta
            content='/favicons/browserconfig.xml'
            name='msapplication-config'
          />
          <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color={theme.colors.white[100]} />
        </Head>
        <body>
          <FlashlessScript
            theme={theme}
            customVariables={colorModeVariables}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
