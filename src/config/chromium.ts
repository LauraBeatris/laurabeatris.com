import { Page, connect, launch } from 'puppeteer-core'

let _page: Page | null
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const chromiumDevOptions = {
  args: [],
  executablePath:
      process.platform === 'win32'
        ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        : process.platform === 'linux'
          ? '/usr/bin/google-chrome'
          : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true
}

function getBrowser () {
  return IS_PRODUCTION
    // Connect to browserless so we don't run Chrome on the same hardware in production
    ? connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`
      })
    // Run the browser locally while in development
    : launch(chromiumDevOptions)
}

async function getPage (): Promise<Page> {
  if (_page) {
    return _page
  }
  // eslint-disable-next-line import/no-named-as-default-member
  const browser = await getBrowser()

  _page = await browser.newPage()
  return _page
}

type GetScreenshotParameters = {
  url: string;
  selectorToWait: string;
};

export async function getScreenshot ({
  url,
  selectorToWait
}: GetScreenshotParameters): Promise<Buffer> {
  const page = await getPage()

  await page.setDefaultNavigationTimeout(0)
  await page.setViewport({ width: 1000, height: 630 })
  await page.goto(url)

  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'dark' }
  ])
  await page.evaluateHandle('document.fonts.ready')
  await page.waitForSelector(selectorToWait, {
    visible: true
  })

  const file = await page.screenshot({ type: 'png' })
  return file as Buffer
}
