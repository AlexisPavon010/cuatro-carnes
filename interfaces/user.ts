export interface IUser {
  _id: string;
  role: ERole
  email: string;
  username: string;
  password?: string;
}

enum ERole {
  user = 'user',
  admin = 'admin'
}