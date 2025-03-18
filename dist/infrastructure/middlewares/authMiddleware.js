"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("@infra/repositories");
const list_1 = require("@domain/list");
const userRepository = new repositories_1.UserRepository();
class AuthMiddleware {
    async authenticateJWT(req, res, next) {
        const token = req.header("Authorization")?.split(" ")[1];
        console.log(token);
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                const user = (await userRepository.findOne({
                    where: { id: decoded.id },
                }));
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    next(list_1.HttpList.UserNotFound);
                }
            }
            catch (error) {
                next(list_1.HttpList.InvalidToken);
            }
        }
        else {
            next(list_1.HttpList.TokenNotProvided);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
