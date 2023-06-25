import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import '@/database/db';
import User from '@/models/User';
import { IUser } from '@/interfaces/user';

type Data =
  | { message: string }
  | IUser

export default function UsersHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsersById(req, res)
    case 'PUT':
      return updateUsersById(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
};

const getUsersById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (!isValidObjectId(req.query.id)) return res.status(400).json({ message: 'El "id" no es un mongo id valido' })

  const data = await User.findById(req.query.id).select('-password').lean()

  if (!data) {
    return res.status(404).json({ message: 'User by id not found' })
  }

  return res.status(200).json(data)
};

const updateUsersById = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const data = await User.findByIdAndUpdate(req.query.id, req.body, { new: true })

    if (!data) {
      return res.status(404).json({ message: 'User by id not found' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al actualizar el usuario.' })
  }
};