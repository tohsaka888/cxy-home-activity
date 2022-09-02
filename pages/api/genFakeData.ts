// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createFakeData } from '../../utils/createFakeData'

/**
 * @openapi
 * /api/genFakeData:
 *   get:
 *     description: 获取假数据
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ success: true, data: createFakeData() })
}
