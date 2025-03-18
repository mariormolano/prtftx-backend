"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
class ErrorMiddleware {
    errorControl(err, req, res, next) {
        const status = err.status || 500;
        const message = err.message || "Internal Server Error";
        if (status < 300) {
            res.status(status).json({
                success: false,
                message,
            });
            next();
        }
        else {
            res.status(status).json({
                success: false,
                message,
            });
        }
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
