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

  const { username, birthday_date, role, phone, _id } = user;

  return {
    email: email.toLocaleLowerCase(),
    name: username,
    birthday_date,
    phone,
    role,
    id: _id
  };
}


export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    const { username, birthday_date, email, role, phone, _id } = user;
    return { name: username, birthday_date, email, role, phone, id: _id };
  }

  const newUser = new User({ email: oAuthEmail, username: oAuthName, password: '@', role: 'client' });
  await newUser.save();

  const { username, email, role, _id } = newUser;
  return { name: username, email, role, id: _id };
}
