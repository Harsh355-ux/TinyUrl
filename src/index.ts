import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./db";
import linksRouter from "./routes/link";
import redirectRouter from "./routes/redirect";
import healthRouter from "./routes/health";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/links", linksRouter);
app.use("/healthz", healthRouter);
app.use("/", redirectRouter); // redirect must be last

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));
});
