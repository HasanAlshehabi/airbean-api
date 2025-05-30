import express from 'express';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';//
import { generateId } from '../utils/generateId.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!global.user) return res.status(403).json({ error: 'Not logged in' });

  const cart = await Cart.findOne({ userId: global.user.userId });
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const order = await Order.create({
    orderId: generateId('order'),
    userId: global.user.userId,
    items: cart.items,
    total
  });

  await Cart.deleteOne({ userId: global.user.userId });

  res.status(201).json({ orderId: order.orderId, total });
});

router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json({ orders });
});

export default router;
