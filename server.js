import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js"


dotenv.config();
const app = express();
const PORT = process.env.PORT;



app.use(express.json());


//routes 
app.use("/api/auth", authRouter )


mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => {console.error("Connection error:", error);});
db.once("open", () => {console.log("Connected to MongoDB");
});
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   });