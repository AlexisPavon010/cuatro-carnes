import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  quantity: { type: Number },
  categorie: { type: String },
  description: { type: String }
}, {
  timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

export default Product;