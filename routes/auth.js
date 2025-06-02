import Router from "express";
import {validateRegistration, validateLogin, HTTPResponses } from "../services/auth.js";
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
  global._activeUser = user; // sätter den globala användaren

  res.json({
    success: true,
    message: result.message,
    user: {
      username: user.username, role: user.role, userId: user.userId
    }
  })

});
//GET Logout
router.get("/logout", (req, res) => {
  global._activeUser = {} //rensar globala användaren
  res.status(200).json({
    success: true,
    message : "You logged out"
  })
});

//POST Register
router.post("/register", async (req, res) => {
  const user = req.body;
  const validationResult = await validateRegistration(user);

  if (validationResult){
    if (!validationResult.successful) {
      res.status(validationResult.statusCode).json(validationResult);
    } else {
      try {
        const createdUser = await User.create(user);
        if (createdUser) {
          res.status(HTTPResponses).json;
        }
      } catch (error) {
        console.log(error.message);
        return null;
      }
    }
  }
});

export default router;
