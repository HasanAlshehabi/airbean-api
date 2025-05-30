import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
