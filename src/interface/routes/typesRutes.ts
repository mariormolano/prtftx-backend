import { Router } from "express";
import {
  AuthMiddleware,
  RoleMiddleware,
  ErrorMiddleware,
} from "@infra/middlewares";
import { TypesController } from "@inter/controllers";
import { UserRoleEnum } from "@domain/enums";

const { authenticateJWT } = new AuthMiddleware();
const { authorizeRoles } = new RoleMiddleware();
const { getTypes, createTypes, updateTypes, deleteTypes, getTypesById } =
  new TypesController();
const { errorControl } = new ErrorMiddleware();

const typesRouter = Router();

typesRouter.get("/types", authenticateJWT, getTypes, errorControl);

typesRouter.get("/types/:id", authenticateJWT, getTypesById, errorControl);

typesRouter.post(
  "/types",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  createTypes,
  errorControl
);

typesRouter.put(
  "/types/:id",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  updateTypes,
  errorControl
);

typesRouter.delete(
  "/types/:id",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  deleteTypes,
  errorControl
);

export { typesRouter };
