import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@graphcms/utils'
import { DateTime } from 'luxon'

import { twitterClient } from 'config/twitterClient'
import { getScreenshot } from 'config/puppeteer'

const secret = process.env.CMS_WEBHOOK_SECRET
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

export default async function handler (
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { body, headers } = request
  const { id, date } = body.data
  const ticketImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/learning-journal/${id}`

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
      return response.redirect(ticketImageUrl)
    }

    const file = await getScreenshot({
      url: ticketImageUrl
    })
    const mediaId = await twitterClient.v1.uploadMedia(file, { mimeType: 'image/png' })
    const twitterResponse = await twitterClient.v2.tweet(`
📝 Learning Journal, ${DateTime.fromISO(date).toFormat('DDD')}:

https://laurabeatris.com/learning-journal
  `, {
      media: { media_ids: [mediaId] }
    })

    response.status(200).json(twitterResponse)
  } catch (error) {
    console.error(error)
    response.status(500).json({ ticketImageUrl, error })
  }
}
