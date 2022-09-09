import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@graphcms/utils'
import { DateTime } from 'luxon'

import { twitterClient } from 'config/twitterClient'

const secret = process.env.CMS_WEBHOOK_SECRET
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

async function getScreenshot ({ url, selectorToWait }) {
  const { data } = await axios.post(
    `https://chrome.browserless.io/screenshot?token=${process.env.BROWSERLESS_API_KEY}`,
    {
      url,
      waitFor: selectorToWait,
      options: {
        type: 'png',
        clip: {
          height: 630,
          width: 1000
        }
      }
    })

  return data
}

export default async function handler (
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { body, headers } = request

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

  const { id, date } = body.data
  const ticketImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/learning-journal/${id}`
  if (isHtmlDebug) {
    return response.redirect(ticketImageUrl)
  }

  const file = await getScreenshot({
    url: ticketImageUrl,
    selectorToWait: '#learning-journal-date'
  })
  console.log({ file })

  const mediaId = await twitterClient.v1.uploadMedia(file, { mimeType: 'image/png' })
  const twitterResponse = await twitterClient.v2.tweet(`
📝 Learning Journal, ${DateTime.fromISO(date).toFormat('DDD')}:

https://laurabeatris.com/learning-journal
  `, {
    media: { media_ids: [mediaId] }
  })

  response.json(twitterResponse)
}
