// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  status: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req?.body?.token)
  //res.status(200).end( JSON.stringify(req.body)  )
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth_token', "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'lax',
      path: '/'
      // domain: '',
      // secure: true,
    })
  )
  res.status(200).json({ status: 'success' })
}
