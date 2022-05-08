import { logger } from "./logger";

export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorHandler = (error, res) => {
  const { statusCode, message } = error;
  logger.error(`${statusCode} - ${message}`);
  res.statusCode(statusCode)
};
