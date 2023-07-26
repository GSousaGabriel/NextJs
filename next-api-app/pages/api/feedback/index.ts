// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const email = req.body.email
    const feedback = req.body.feedback

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback
    }

    writeNewFeedback(newFeedback)

    res.status(200).json(newFeedback)
  } else {
    const data = await getFeedbacks()
    res.status(200).json(data)
  }
}

const writeNewFeedback = async (feedback: Data) => {
  const dataPath = path.join(process.cwd(), 'data', 'feedback.json')
  const data = await getFeedbacks()
  data.push(feedback)
  await fs.writeFile(dataPath, JSON.stringify(data))
}

export const getFeedbacks = async () => {
  const dataPath = path.join(process.cwd(), 'data', 'feedback.json')
  return JSON.parse(await fs.readFile(dataPath, 'utf-8'))
}
