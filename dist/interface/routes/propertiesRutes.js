"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertiesRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("@infra/middlewares");
const controllers_1 = require("@inter/controllers");
const enums_1 = require("@domain/enums");
const { authenticateJWT } = new middlewares_1.AuthMiddleware();
const { authorizeRoles } = new middlewares_1.RoleMiddleware();
const { getProperties, createProperties, updateProperties, deleteProperties, getPropertiesById, } = new controllers_1.PropertiesController();
const { errorControl } = new middlewares_1.ErrorMiddleware();
const propertiesRouter = (0, express_1.Router)();
exports.propertiesRouter = propertiesRouter;
propertiesRouter.get("/properties", authenticateJWT, getProperties, errorControl);
propertiesRouter.get("/properties/:id", authenticateJWT, getPropertiesById, errorControl);
propertiesRouter.post("/properties/", authenticateJWT, authorizeRoles(enums_1.UserRoleEnum.ADMIN), createProperties, errorControl);
propertiesRouter.put("/properties/:id", authenticateJWT, authorizeRoles(enums_1.UserRoleEnum.ADMIN), updateProperties, errorControl);
propertiesRouter.delete("/properties/:id", authenticateJWT, authorizeRoles(enums_1.UserRoleEnum.ADMIN), deleteProperties, errorControl);
