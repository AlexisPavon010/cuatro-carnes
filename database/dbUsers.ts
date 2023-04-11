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

  const { username, role, _id } = user;

  return {
    email: email.toLocaleLowerCase(),
    username,
    role,
    id: _id
  };
}


export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    const { username, email, role, _id } = user;
    return { username, email, role, id: _id };
  }

  const newUser = new User({ email: oAuthEmail, username: oAuthName, password: '@', role: 'client' });
  await newUser.save();

  const { username, email, role, _id } = newUser;
  return { username, email, role, id: _id };
}
