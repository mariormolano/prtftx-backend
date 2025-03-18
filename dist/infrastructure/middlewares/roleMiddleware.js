"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMiddleware = void 0;
const userRoleEnum_1 = require("@domain/enums/userRoleEnum");
const list_1 = require("@domain/list");
class RoleMiddleware {
    authorizeRoles(allowedRoles) {
        return (req, res, next) => {
            if (!req.user) {
                next(list_1.HttpList.Unauthenticated);
            }
            else {
                const roleReq = req.user.role;
                const role = roleReq ? roleReq : userRoleEnum_1.UserRoleEnum.USER;
                if (!role === allowedRoles.includes(role)) {
                    next(list_1.HttpList.Unauthorized);
                }
            }
            next();
        };
    }
}
exports.RoleMiddleware = RoleMiddleware;
