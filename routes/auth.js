import Router from "express";
import {validateRegistration, validateLogin} from "../services/auth.js";
import User from "../models/User.js";

const router = Router();

//POST Login
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body
  const result = await validateLogin(username, password, role)

  if(!result.success) {
    return res.status(401).json({
      success: false,
      message: result.message
    })
  }
  const user = result.user
  res.json({
    success: true,
    message: result.message,
    user: {
      username: user.username, role: user.role
    }
  })

});
//GET Logout
router.get("/logout", (req, res) => {});

//POST Register
router.post("/register", async (req, res) => {
  //Skicka username, password
  const { username, password, role } = req.body;
  
  if (await validateRegistration(username, password, role))
    try {
      const result = await User.create(user);
      return result;
    } catch (error) {
      console.log(error.message);
      return null;
    }
});

export default router;
