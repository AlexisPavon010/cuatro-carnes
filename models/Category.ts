import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema({
  name: { type: String },
  image: { type: String },
  password: { type: String },
}, {
  timestamps: true
})

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

export default Category;