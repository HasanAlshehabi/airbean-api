import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 10,
  },
  role: {
    type: [String],
    required: true,
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
