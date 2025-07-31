import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'users' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, required: true, min: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model('carritos', cartSchema);
