import { Router } from "express";
import {
  AuthMiddleware,
  RoleMiddleware,
  ErrorMiddleware,
} from "@infra/middlewares";
import { PropertiesController } from "@inter/controllers";
import { UserRoleEnum } from "@domain/enums";

const { authenticateJWT } = new AuthMiddleware();
const { authorizeRoles } = new RoleMiddleware();
const {
  getProperties,
  createProperties,
  updateProperties,
  deleteProperties,
  getPropertiesById,
} = new PropertiesController();
const { errorControl } = new ErrorMiddleware();

const propertiesRouter = Router();

propertiesRouter.get(
  "/properties",
  authenticateJWT,
  getProperties,
  errorControl
);

propertiesRouter.get(
  "/properties/:id",
  authenticateJWT,
  getPropertiesById,
  errorControl
);

propertiesRouter.post(
  "/properties/",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  createProperties,
  errorControl
);

propertiesRouter.put(
  "/properties/:id",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  updateProperties,
  errorControl
);

propertiesRouter.delete(
  "/properties/:id",
  authenticateJWT,
  authorizeRoles(UserRoleEnum.ADMIN),
  deleteProperties,
  errorControl
);

export { propertiesRouter };
