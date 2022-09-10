import { connect } from 'puppeteer'

type GetScreenshotParameters = {
  url: string;
}

export async function getScreenshot ({ url }: GetScreenshotParameters) {
  const browser = await connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`
  })
  const page = await browser.newPage()

  await page.setViewport({ width: 1000, height: 630 })
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])
  await page.goto(url, { waitUntil: 'networkidle0' })

  const file = await page.screenshot({ type: 'png' })
  return file
}
