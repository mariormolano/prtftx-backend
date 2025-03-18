import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  status?: number;
  message?: string;
}

export class ErrorMiddleware {
  public errorControl(
    err: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    if (status < 300) {
      res.status(status).json({
        success: false,
        message,
      });
      next();
    } else {
      res.status(status).json({
        success: false,
        message,
      });
    }
  }
}
