import mongoose from "mongoose";
import { getActiveUser } from "../globalActiveUser/globalActiveUser.js";

const cartSchema = new mongoose.Schema({
  items: [
  {
    prodId: { type: String, required: true },
    title: String,
    price: Number,
    qty: Number,
  }
],

  userId: {
    default: () => getActiveUser(),
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
