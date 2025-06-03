import mongoose from "mongoose";
import { getActiveUser } from "../globalActiveUser/globalActiveUser.js";
import { v4 as uuidv4 } from "uuid";

const cartSchema = new mongoose.Schema({
  items: [
    {
      prodId: { type: String, required: true },
      title: String,
      price: Number,
      qty: Number,
    },
  ],

  userId: {
    default: () => getActiveUser(),
    type: String,
    required: true,
  },
  cartId: {
    type: String,
    default: () => uuidv4().replace(/-/g, "").slice(0, 10),
    unique: true,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
