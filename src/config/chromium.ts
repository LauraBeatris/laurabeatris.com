import { Page, launch } from 'puppeteer-core'

import chromium from 'chrome-aws-lambda'

let _page: Page | null
const isDev = !process.env.AWS_REGION

async function chromiumOptions () {
  return isDev
    ? {
        args: [],
        executablePath:
        process.platform === 'win32'
          ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
          : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true
      }
    : {
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: true
      }
}

async function getPage (): Promise<Page> {
  if (_page) {
    return _page
  }

  // eslint-disable-next-line import/no-named-as-default-member
  const browser = await launch(await chromiumOptions())

  _page = await browser.newPage()

  return _page
}

type GetScreenshotParameters = {
  url: string;
  selectorToWait: string;
}

export async function getScreenshot ({ url, selectorToWait }: GetScreenshotParameters): Promise<Buffer> {
  const page = await getPage()

  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])
  await page.setViewport({ width: 1000, height: 630 })
  await page.goto(url)
  await page.waitForSelector(selectorToWait)
  await page.evaluateHandle('document.fonts.ready')

  const file = await page.screenshot({ type: 'png' })
  return file as Buffer
}
