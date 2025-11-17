// index.js
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import dotenv from "dotenv";
const app = express();
import cors from "cors";
const PORT = 3000;
import { calculatedDiscount } from './controller.js';


app.use(cors());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));


app.post("/",(req,res)=>{
  res.send("Server running");
});

app.post("/calculate", calculatedDiscount);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
