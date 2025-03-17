import { Router } from "express";
import { AuthController } from "../../interface/controllers";
import { AuthMiddleware } from "../../infrastructure/middlewares";
import { RequestWithUser } from "../../domain/interfaces";
import { UserRoleEnum } from "../../domain/enums";

const { authenticateJWT, authorizeRoles } = new AuthMiddleware();
const { register, login } = new AuthController();

const authRouter = Router();

// Auth routes
authRouter.post("/register", register);
authRouter.post("/login", login);

// Protected route example
authRouter.get("/profile", authenticateJWT, (req: RequestWithUser, res) => {
  res.json(req.user);
});

// Admin route example
authRouter.get(
  "/admin",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  (req, res) => {
    res.send("Panel de administración");
  }
);

export { authRouter };
