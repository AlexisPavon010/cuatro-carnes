import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt'

import '@/database/db'
import User from '@/models/User'
import { IUser } from '@/interfaces/user'
import { signToken } from '@/utils/jwt'

type Data =
  | { message: string }
  | {
    user: IUser,
    token: string
  }

export default function LoginHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })

  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: 'User not exist' })


  if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ message: 'correo o contraseña incorrecto' })

  const { _id, role, username } = user;

  return res.status(200).json({
    token: signToken(_id, email),
    user: {
      _id,
      role,
      email,
      username
    }
  })
}