import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from "dotenv";
import connectToDB from './lib/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Hello from Express");
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});