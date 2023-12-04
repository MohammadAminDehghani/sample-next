// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
  status: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    token: string
  }
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req?.body?.token)
  //res.status(200).end( JSON.stringify(req.body)  )
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth_token', req?.body?.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5,
      sameSite: 'lax',
      path: '/'
      // domain: '',
      // secure: true,
    })
  )
  res.status(200).json({ status: 'success' })
}
