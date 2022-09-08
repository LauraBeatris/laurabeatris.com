import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@graphcms/utils'

import { getScreenshot } from 'config/chromium'

const secret = process.env.CMS_WEBHOOK_SECRET
const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

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

  const ticketImageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/learning-journal/${body.data.id}`
  if (isHtmlDebug) {
    return response.redirect(ticketImageUrl)
  }

  const file = await getScreenshot(ticketImageUrl, isDev)
  response.statusCode = 200
  response.setHeader('Content-Type', 'image/png')
  response.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-manage=31536000, max-age=31536000'
  )

  response.end(file)
}
