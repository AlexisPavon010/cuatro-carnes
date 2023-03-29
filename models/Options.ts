import mongoose, { Schema } from 'mongoose'

const OptionSchema = new Schema({
  name: { type: String },
  quantity: { type: Number },
  status: { type: Boolean, default: true },
}, {
  timestamps: true
})

const Option = mongoose.models.Option || mongoose.model('Option', OptionSchema)

export default Option;