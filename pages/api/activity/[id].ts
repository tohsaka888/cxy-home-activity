// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from 'utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * paths:
 *   /api/activity/{id}:
 *     get:
 *       description: 获取活动详情
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           example: 631171a3af8068a88bcc6359
 *           schema:
 *              type: string
 *       responses:
 *         200:
 *           description: 返回活动详情
 *               
 */

 const cors = Cors({
  methods: ['POST', 'GET', 'HEAD',],
  origin: '*',
  preflightContinue: true
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors)
    const db = await connectDB()
    const query = req.query
    if (db) {
      const activityCollection = db.collection('activity')
      const activity = await activityCollection.findOne({ _id: new ObjectId(query.id as string) })
      res.status(200).json({ success: true, activity })
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
}