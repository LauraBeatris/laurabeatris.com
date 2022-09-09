import puppeteer, { Page } from 'puppeteer-core'

import { getOptions } from './chromeOptions'

let _page: Page | null
const isDev = !process.env.AWS_REGION

async function getPage (isDev: boolean): Promise<Page> {
  if (_page) {
    return _page
  }

  const options = await getOptions(isDev)
  // eslint-disable-next-line import/no-named-as-default-member
  const browser = await puppeteer.launch(options)

  _page = await browser.newPage()
  return _page
}

type GetScreenshotParameters = {
  url: string;
  selectorToWait: string;
}

export async function getScreenshot ({
  url, selectorToWait
}: GetScreenshotParameters): Promise<Buffer> {
  const page = await getPage(isDev)

  await page.setDefaultNavigationTimeout(0)
  await page.setViewport({ width: 1000, height: 630 })
  await page.goto(url)
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])
  await page.evaluateHandle('document.fonts.ready')
  await page.waitForSelector(selectorToWait, {
    visible: true
  })

  const file = await page.screenshot({ type: 'png' })
  return file as Buffer
}
