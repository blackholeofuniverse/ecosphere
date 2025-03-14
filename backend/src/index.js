import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from "dotenv";
import connectToDB from './lib/db.js';
dotenv.config();

const app = express();

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});