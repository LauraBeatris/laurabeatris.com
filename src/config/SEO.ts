const title = 'Laura Beatris – Product Engineer'
const description = 'Passionate for building high-quality experiences.'
const url = 'https://laurabeatris.com'

export const configSEO = {
  title,
  description,
  canonical: url,
  openGraph: {
    url: url,
    type: 'website',
    title,
    locale: 'en-CA',
    description,
    images: [
      {
        url: `${url}/images/banner.png`,
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    site: '@lauradotjs',
    handle: '@lauradotjs',
    cardType: 'summary_large_image'
  }
}
