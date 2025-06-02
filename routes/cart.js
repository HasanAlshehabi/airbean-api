import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET all carts
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No cart could be found",
    });
  }
});

// hämta cart med given cartId
router.get("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    if (!cart) {
      res.status(400).json({
        success: false,
        message: "No cart was found with provided ID",
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not get the Cart",
    });
  }
});

export default router;
