import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt'

import '@/database/db'
import User from '@/models/User'
import { IUser } from '@/interfaces/user'
import { signToken } from '@/utils/jwt'
import Joi from 'joi'

type Data =
  | { message: string }
  | {
    user: IUser,
    token: string
  }

const schema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  phone: Joi.string(),
  password: Joi.string()
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) // at least one digit in any position
    .min(6)
    .required()
    .messages({ "string.pattern.base": "La contraseña debe contener Minusculas y un numero" }),
});

export default function RegisterHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', username = '', phone = null } = req.body

  try {
    await schema.validateAsync(req.body);

    const user = await User.findOne({ email })

    if (user) return res.status(400).json({ message: 'User exist' })

    const newUser = new User({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      username,
      phone,
    })

    newUser.save()

    const { _id, role } = newUser;

    return res.status(200).json({
      token: signToken(_id, email),
      user: {
        _id,
        role,
        email,
        username
      }
    })

  } catch (error: any) {
    return res.status(400).json({ message: error.details })
  }
}