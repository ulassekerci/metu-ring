import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiReq = await fetch('https://ring.metu.edu.tr/ring.json')
  const data = await apiReq.text()
  res.send(data)
}
