import Router from "express";
import validateRegistration, { HTTPResponses } from "../services/auth.js";
import User from "../models/User.js";

const router = Router();

//POST Login
router.post("/login", (req, res) => {});
//GET Logout
router.get("/logout", (req, res) => {});

//POST Register
router.post("/register", async (req, res) => {
  const user = req.body;
  const validationResult = await validateRegistration(user);

  if (validateRegistration) {
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
