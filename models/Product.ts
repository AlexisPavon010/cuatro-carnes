import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  stock: { type: Number },
  category: { type: String },
  status: { type: Boolean, default: true },
  description: { type: String }
}, {
  timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;