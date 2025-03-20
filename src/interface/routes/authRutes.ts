import { Router } from "express";
import { AuthController } from "@inter/controllers";
import { ErrorMiddleware } from "@infra/middlewares";
const { register, login, verify } = new AuthController();
const { errorControl } = new ErrorMiddleware();

const authRouter = Router();

authRouter.post("/register", register, errorControl);
authRouter.post("/login", login, errorControl);
authRouter.post("/verify", verify, errorControl);

export { authRouter };
