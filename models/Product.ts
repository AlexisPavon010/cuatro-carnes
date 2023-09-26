import mongoose, { Schema } from 'mongoose'

export const ProductSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  stock: { type: String },
  category: { type: String },
  description: { type: String },
  product_code: { type: Number },
  offert_price: { type: Number },
  status: { type: Boolean, default: true },
  is_new: { type: Boolean, default: false },
  is_offer: { type: Boolean, default: false },
  is_highlighted: { type: Boolean, default: false },
  is_offer_quantity: { type: Boolean, default: false },
  offer_quantity: { type: Number, default: 2 },
  offer_quantity_price: { type: Number, default: 1 },
  options: []
}, {
  timestamps: true
})

ProductSchema.index({ title: 'text', description: 'text' })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;