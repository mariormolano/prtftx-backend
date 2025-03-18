import { Request, Response, NextFunction } from "express";
import { UserRoleEnum } from "@domain/enums/userRoleEnum";
import { User } from "@domain/entities";
import { HttpList as HL } from "@domain/list";

interface RequestWithUser extends Request {
  user?: User;
}

export class RoleMiddleware {
  public authorizeRoles(allowedRoles: UserRoleEnum) {
    return (req: RequestWithUser, res: Response, next: NextFunction): void => {
      if (!req.user) {
        next(HL.Unauthenticated);
      } else {
        const roleReq = req.user.role as UserRoleEnum;
        const role: UserRoleEnum = roleReq ? roleReq : UserRoleEnum.USER;

        if (!role === allowedRoles.includes(role as UserRoleEnum)) {
          next(HL.Unauthorized);
        }
      }
      next();
    };
  }
}
