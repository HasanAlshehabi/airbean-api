import express from "express";
import { updateCart, getCartByUserId, getCartById } from "../services/cart.js";
import { getActiveUserId } from "../globalActiveUser/globalActiveUser.js";
import { requireAuth } from "../middleware/authorization.js";
const router = express.Router();

// GET all carts
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = getActiveUserId();
    const cart = await getCartByUserId(userId);
    res.json(cart);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No cart could be found",
    });
  }
});

// hämta cart med given cartId
router.get("/:cartId", requireAuth, async (req, res) => {
  try {
    const cart = await getCartById(req.params.cartId);
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

// PUT
router.put("");

export default router;
