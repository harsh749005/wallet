import express from "express";
import dotenv from "dotenv";
import transactionsRoute from "./routes/transactionsRoute.js";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
// middleware
app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});