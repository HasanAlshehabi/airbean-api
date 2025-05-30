import express from 'express';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';

const router = express.Router();

//(admin/test)
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// hämta alla ordrar för användare
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

//skapa order utifrån cartId
router.post('/', async (req, res) => {
  const { cartId } = req.body;

  const cart = await Cart.findById(cartId);
  if (!cart) return res.status(400).json({ error: 'Invalid cart ID' });

  const total = cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const order = await Order.create({
    userId: cart.userId,
    items: cart.items,
    total
  });

  await Cart.findByIdAndDelete(cartId); // Rensa vagnen efter beställning

  res.status(201).json({
    message: 'Order placed',
    total,
    orderMongoId: order._id 
  });
});

export default router;
