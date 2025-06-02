import Cart from "../models/Cart.js";
import Product from "../models/product.js";

export async function updateCart(activeUserId, userId, prodId, qty) {
  const product = await Product.findOne({ prodId });
  if (!product) throw new Error("Invalid product ID");

  let userId = activeUserId || guestId;
  let isGuest = false;

  if (!userId) {
    userId = `guest-${Math.floor(Math.random().toString(36).substring(2, 10))}`;
    isGuest = true;
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = await Cart.create({ userId, items: [] });

  const existingItem = cart.items.find((item) => item.prodId === prodId);
  if (existingItem) {
    existingItem.qty = qty;
  } else {
    cart.items.push({
      prodId,
      title: product.title,
      price: product.price,
      qty,
    });
  }

  await cart.save();
  return { cart, isGuest };
}

export async function getCartByUserId(userId) {
  return (await Cart.findOne({ userId })) || { items: [] };
}

export async function getCartById(cartId) {
  return await Cart.findById(cartId);
}
