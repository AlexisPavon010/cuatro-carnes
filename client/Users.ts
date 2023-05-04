import axios from 'axios'

export const registerUser = ({ username, email, phone, password }: { email: string, phone: string, username: string, password: string, }) => {
  return axios.post('/api/users/register', {
    username,
    email,
    phone,
    password
  })
}

export const updateUser = (role: string, id: string) => {
  return axios.put('/api/users/users', {
    role,
    id
  })
}

export const recoveryPassword = (email: string) => {
  return axios.post('/api/auth/recovery-password', {
    email
  })
}

export const resetPassword = (password: string, token: string) => {
  return axios.post('/api/auth/reset-password', {
    password,
    token
  })
}