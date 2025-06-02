import Router from "express";
import validateRegistration from "../services/auth";
import User from "../models/User";

const router = Router();

//POST Login
router.post("/login", (req, res) => {});
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
