import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

import User from "@/models/User"

export default function handlerResetPassword(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return resetPassword(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

async function resetPassword(req: NextApiRequest, res: NextApiResponse<any>) {
  const { password: newPassword, token } = req.body as { password: string, token: string }

  try {
    const decode: any = jwt.verify(token, process.env.AUTH_JWT_SECRET!)

    const user = await User.findById(decode.id)

    user.password = bcrypt.hashSync(newPassword, 10)

    await user.save()

    return res.status(200).json({
      message: 'success'
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
