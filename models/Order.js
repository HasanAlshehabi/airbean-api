import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  
    orderId: { 
    type: String, 
    required: true, 
    unique: true },

  
    userId: {
     type: String,
      required: true },
  
      items: [
    {
      prodId: String,
      title: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  orderDate: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);
