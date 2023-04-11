import mongoose, { Schema } from 'mongoose'

const CouponsSchema = new Schema({
  name: { type: String },
  discount: { type: Number },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
})

const Coupons = mongoose.models.Coupons || mongoose.model('Coupons', CouponsSchema)

export default Coupons;