import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@graphcms/utils'
import { DateTime } from 'luxon'
import mql from '@microlink/mql'
import axios from 'axios'

import { twitterClient } from 'config/twitterClient'

const secret = process.env.CMS_WEBHOOK_SECRET
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

async function getScreenshotBuffer (url: string) {
  const { data } = await mql(url, {
    colorScheme: 'dark',
    viewport: {
      width: 1000,
      height: 630
    },
    screenshot: {
      type: 'png'
    }
  })

  const { data: fileDownload } = await axios.get(data.screenshot.url, {
    responseType: 'arraybuffer'
  })
  return Buffer.from(fileDownload, 'utf-8')
}

async function sendTweetWithScreenshot (date: string, screenshotBuffer: Buffer) {
  const mediaId = await twitterClient.v1.uploadMedia(screenshotBuffer, {
    mimeType: 'image/png'
  })
  const twitterResponse = await twitterClient.v2.tweet(`
📝 Learning Journal, ${DateTime.fromISO(date).toFormat('DDD')}:

https://laurabeatris.com/learning-journal
    `, {
    media: { media_ids: [mediaId] }
  })

  return twitterResponse
}

export default async function handler (
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { body, headers } = request
  const { id, date } = body.data ?? {}
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/learning-journal/${id}`

  try {
    const signature = headers['gcms-signature']
    const hasValidSignature =
    signature &&
    verifyWebhookSignature({
      body,
      secret,
      signature
    })

    if (!hasValidSignature) {
      return response.status(403).send('Invalid webhook request')
    }

    if (isHtmlDebug) {
      return response.redirect(url)
    }

    const screenshotBuffer = await getScreenshotBuffer(url)
    const twitterResponse = await sendTweetWithScreenshot(date, screenshotBuffer)

    response.status(200).json(twitterResponse)
  } catch (error) {
    console.error(error)
    response
      .status(error?.response?.status || 500)
      .json({ message: error?.message || 'Something went wrong' })
  }
}
