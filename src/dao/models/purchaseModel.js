// models/Purchase.js
import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  purchaseCode: { type: String, required: true, unique: true },
  purchaseDate: { type: Date, default: Date.now }
});

export default mongoose.model('purchases', purchaseSchema);