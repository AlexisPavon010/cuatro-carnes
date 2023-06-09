import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username:     { type: String },
  phone:        { type: String },
  birthday_date:{ type: String },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
  role:         {
                  type: String,
                  enum: {
                    values: 'admin' || 'client',
                    message: '{ VALUE } is not a valid role',
                    default: 'client',
                    required: true
                  }
                },
}, {
  timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User;