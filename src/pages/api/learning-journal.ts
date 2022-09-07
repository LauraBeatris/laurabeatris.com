import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@graphcms/utils'

import { getLearningJournalPagesCount } from 'graphql/queries/getLearningJournalPagesCount'

const secret = process.env.CMS_WEBHOOK_SECRET

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

  const pagesCount = await getLearningJournalPagesCount()

  return response.json({ pagesCount })
}
