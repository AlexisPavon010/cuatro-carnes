import type { NextApiRequest, NextApiResponse } from 'next'

import '@/database/db'
import User from '@/models/User'
import { IUser } from '@/interfaces/user'

type Data =
  | { message: string }
  | IUser

export default function UsersHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res)
    case 'PUT':
      return updateUser(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })

  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data: IUser = await User.find().select('-password').lean()
  return res.status(200).json(data)
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { _id = '', role = '' } = req.body;

  const data = await User.findById(_id)

  if (!data) {
    return res.status(404).json({ message: 'User by id not found' })
  }

  data.role = role;
  await data.save()

  return res.status(200).json(data)
}