/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:10:59
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-09 17:22:08
 * @Description: 请填写简介
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * /api/brief:
 *   get:
 *     description: 获取比赛简单列表
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
  try {
    await runMiddleware(req, res, cors)
    const db = await connectDB()
    if (db) {
      const competition = db.collection('activity')
      const competitions = await competition.find({}).toArray()
      const briefList = competitions.map((item) => ({ id: item._id, name: item.name }))
      res.status(200).json({ success: true, list: briefList })
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(200).json({ success: false, error: (error as Error).message })
  }
}