import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@graphcms/utils'
// import { DateTime } from 'luxon'

import axios from 'axios'

// import { twitterClient } from 'config/twitterClient'

const secret = process.env.CMS_WEBHOOK_SECRET
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

export default async function handler (
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { body, headers } = request
  const { id } = body.data ?? {}
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

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/screenshot`, { url })
    const fileBuffer = Buffer.from(data.result, 'base64')

    // const mediaId = await twitterClient.v1.uploadMedia(fileBuffer, {
    //   mimeType: 'image/png'
    // })
    // const twitterResponse = await twitterClient.v2.tweet(`
    // 📝 Learning Journal, ${DateTime.fromISO(date).toFormat('DDD')}:

    // https://laurabeatris.com/learning-journal
    //   `, {
    //   media: { media_ids: [mediaId] }
    // })

    response.status(200).json(fileBuffer)
  } catch (error) {
    console.error(error)
    response
      .status(error?.response?.status || 500)
      .json({ message: error?.message || 'Something went wrong' })
  }
}
