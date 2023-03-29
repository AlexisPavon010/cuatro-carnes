import bcrypt from 'bcrypt'

import User from '@/models/User';
import "./db"

export const checkUserEmailPassword = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return null
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return null
  }

  const { name, role, _id } = user;

  return {
    email: email.toLocaleLowerCase(),
    name,
    role,
    id: _id
  };
}


export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    const { name, email, role, _id } = user;
    return { name, email, role, id: _id };
  }

  const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' });
  await newUser.save();

  const { name, email, role, _id } = newUser;
  return { name, email, role, id: _id };
}

export const getUser = async (email: string) => {
  const user = await User.findOne({ email });

  return user;
}
