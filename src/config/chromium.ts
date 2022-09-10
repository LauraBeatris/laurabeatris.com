import { Page, launch } from 'puppeteer-core'

import chrome from 'chrome-aws-lambda'

let _page: Page | null

async function getChromeOptions () {
  return process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      }
    : {
        args: [],
        executablePath:
          process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
              ? '/usr/bin/google-chrome'
              : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

      }
}

type GetScreenshotParameters = {
  url: string;
}

export async function getScreenshot ({ url }: GetScreenshotParameters) {
  const options = await getChromeOptions()
  const browser = await launch(options)
  const page = await browser.newPage()

  await page.setViewport({ width: 1000, height: 630 })
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])
  await page.goto(url, { waitUntil: 'networkidle0' })

  const file = await page.screenshot({ type: 'png' })
  return file
}
