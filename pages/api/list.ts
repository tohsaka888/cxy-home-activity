// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * /api/list:
 *   post:
 *     description: 获取比赛列表
 *     requestBody:
 *       description: 获取page limit列表
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: 返回列表
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                 list: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: axxss
 *                       name:
 *                         type: string
 *                         example: 比赛
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
  const { page, limit } = req.body
  try {
    await runMiddleware(req, res, cors)
    const db = await connectDB()
    if (db) {
      const activity = db.collection('activity')
      const activitys = await activity.find({}).skip((page - 1) * limit).limit(limit).toArray()
      res.status(200).json({ success: true, list: activitys })
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
}