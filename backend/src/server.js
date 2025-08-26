import express from "express";
import dotenv from "dotenv";
import transactionsRoute from "./routes/transactionsRoute.js";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/cron.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
// middleware
app.use(rateLimiter);
app.use(express.json());

if (process.env.NODE_ENV === "production") job.start();

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});