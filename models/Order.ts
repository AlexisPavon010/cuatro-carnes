import mongoose, { Schema } from 'mongoose'

export const OrderSchema = new Schema({
  uniqueID: { type: String, unique: true },
  total: { type: Number },
  username: { type: String },
  email: { type: String },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['delivered', 'canceled', 'pending'],
      message: '{ VALUE } is not a valid status',
      required: true
    }
  }
}, {
  timestamps: true
})

OrderSchema.pre('save', async function (next) {
  const doc = this;
  // Generamos un nuevo valor único solo si el documento es nuevo
  if (doc.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    const newId = `0000${count + 1}`.slice(-5);
    doc.uniqueID = newId;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)

export default Order;