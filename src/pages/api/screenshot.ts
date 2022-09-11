import { NextApiRequest, NextApiResponse } from 'next'

import { connect } from 'puppeteer-core'

const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

const viewport = { width: 1000, height: 630 }
export async function getScreenshotBase64 (url: string) {
  const browser = await connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`
  })
  const page = await browser.newPage()

  await page.setViewport(viewport)
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])
  await page.goto(url, { waitUntil: 'networkidle0' })

  const base64File = await page.screenshot({
    type: 'png',
    encoding: 'base64',
    clip: {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height
    }
  })

  await browser.close()
  return base64File
}

export default async function handler (
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { body: { url } } = request

  if (isHtmlDebug) {
    return response.redirect(url)
  }

  try {
    response.status(200).json({ result: await getScreenshotBase64(url) })
  } catch (error) {
    console.error(error)
    response
      .status(error?.response?.status || 500)
      .json({ message: error?.message || 'Something went wrong' })
  }
}
