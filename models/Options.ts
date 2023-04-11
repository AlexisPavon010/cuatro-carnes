import mongoose, { Schema } from 'mongoose'

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
});

const OptionSchema = new Schema({
  name: { type: String },
  quantity: { type: Number },
  status: { type: Boolean, default: true },
  items: [ItemSchema]
}, {
  timestamps: true
})

const Option = mongoose.models.Option || mongoose.model('Option', OptionSchema)

export default Option;