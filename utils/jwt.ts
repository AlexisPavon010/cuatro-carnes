import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {

  if (!process.env.AUTH_JWT_SECRET) {
    throw new Error("No hay variable de jwt");
  }

  return jwt.sign({ _id, email }, process.env.AUTH_JWT_SECRET, { expiresIn: '30d' })
}