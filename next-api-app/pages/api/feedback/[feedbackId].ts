// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFeedbacks } from '.'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const feedbackId = req.query.feedbackId
    const feedback = await getFeedbackById(feedbackId)

    res.status(200).json(feedback)
}

export const getFeedbackById = async (id: string | undefined | string[]) => {
    const data = await getFeedbacks()
    const filteredId = data.find((feedback: Data) => feedback.id === id)
    return filteredId
}
