import chromium from 'chrome-aws-lambda'

export async function getOptions (isDev: boolean) {
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
