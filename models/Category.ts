import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema({
  name: { type: String },
  description: { type: String },
}, {
  timestamps: true
})

CategorySchema.index({ name: 'text', description: 'text' });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

export default Category;