import mongoose, { Schema } from 'mongoose'
import Product from './Product';
import { IProduct } from '@/interfaces/products';

export const OrderSchema = new Schema({
  uniqueID: { type: String, unique: true },
  total: { type: Number },
  username: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  reference: { type: String },
  paymentOption: { type: String },
  userID: { type: String },
  fleet: { type: String, default: 'default' },
  cords: [Number, Number],
  items: [],
  status: {
    type: String,
    default: 'PENDING',
    enum: {
      values: ['COMPLETED', 'CANCELLED', 'DELIVERED', 'PENDING'],
      message: '{ VALUE } is not a valid status',
      required: true
    }
  }
}, {
  timestamps: true
})

OrderSchema.pre('findOneAndUpdate', async function (next) {
  // Obtenemos la orden actualizada
  const order = await Order.findOne({ _id: this.getQuery()._id }).exec();

  if (!order) {
    throw new Error('No se encontró la orden');
  }

  // Si el estado de la orden es completado, actualiza el stock del producto
  //  @ts-ignore 
  if (this._update.status === 'COMPLETED') {
    order.items.forEach(async (item: IProduct) => {
      const product = await Product.findById({ _id: item._id });

      if (!product) {
        throw new Error(`No se encontró el producto con el ID: ${item._id}`);
      }

      // Actualiza el stock del producto
      if (item.kg_stock) {
        product.kg_stock -= item.kg_stock;
      } else {
        product.q_stock -= item.q_stock;
      }

      await product.save();
    });
  }

  next();
});

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