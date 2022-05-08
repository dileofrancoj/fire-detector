import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import { logger } from "./utils/logger";
import { errorHandler } from "./utils/errorHandler";
import * as _ from './services/mqttHandler'
// Heroku
dotenv.config();
const app = express();
const port = 8070;
const host = "0.0.0.0";

app.use(express.json());
app.use(morgan("combined"));

// healt checker
app.use("/health", (req, res, next) => res.send("Hi API"));

app.listen(port, host, () => {
  logger.info("Server running");
});

app.use((_, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((error, req, res) => {
  return errorHandler(error, res);
});
