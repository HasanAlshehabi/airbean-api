import express from "express";
import { Cart } from "../models/Cart.js";

const router = express.Router();

// GET all carts
router.get("/", async (req, res) => {
  const cart = await Cart.find();
  res.json(cart);
});

// hämta cart med given cartId
router.get("/:cartId", async (req, res) => {
  const cart = await Cart.find({ userId: req.params.userId });
  res.json(cart);
});
