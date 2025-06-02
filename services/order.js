import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';

export async function getAllOrders() {
  return await Order.find();
}

export async function getOrdersByUserId(userId) {
  return await Order.find({ userId });
}

export async function createOrder(cartId) {
  const cart = await Cart.findById(cartId);
  if (!cart) throw new Error('Invalid cart ID');

  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const order = await Order.create({
    userId: cart.userId,
    items: cart.items,
    total
  });

  await Cart.findByIdAndDelete(cartId);
  return order;
}
