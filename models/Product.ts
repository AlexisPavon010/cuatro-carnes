import mongoose, { Schema } from 'mongoose'

export const ProductSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  q_stock: { type: Number },
  kg_stock: { type: Number },
  offert_price: { type: Number },
  category: { type: String },
  status: { type: Boolean, default: true },
  description: { type: String },
  options: []
}, {
  timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;