import chromium from 'chrome-aws-lambda'

type GetScreenshotParameters = {
  url: string;
}

const viewport = { width: 1000, height: 630 }

export async function getScreenshot ({ url }: GetScreenshotParameters) {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true
  })

  const page = await browser.newPage()
  page.setViewport(viewport)
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])

  await page.goto(url, {
    timeout: 5 * 1000, // 5 seconds
    waitUntil: 'networkidle2'
  })

  const file = await page.screenshot({
    type: 'png',
    quality: 100,
    clip: {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height
    }
  })
  await browser.close()

  return file
}
