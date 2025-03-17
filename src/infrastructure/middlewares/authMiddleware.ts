import { Response, NextFunction } from "express";
import { RequestWithUser } from "../../domain/interfaces";
import jwt from "jsonwebtoken";
import { User } from "../../domain/entities";
import { dataSource } from "../../infrastructure/config";
import { UserRoleEnum } from "../../domain/enums";

export class AuthMiddleware {
  public authenticateJWT = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let status: {
      number: number;
      message: string;
    } = { number: 200, message: "" };

    const token = req.header("Authorization")?.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: number;
        };
        const user = (await dataSource.getRepository(User).findOne({
          where: { id: decoded.id },
          relations: ["roles"],
        })) as User;

        if (user) {
          req.user = user;
        } else {
          status.number = 401;
          status.message = "Usuario no encontrado";
        }

        next();
      } catch (error) {
        status.number = 400;
        status.message = "Token inválido";
      }
    } else {
      status.number = 401;
      status.message = "Token no proveído";
    }
    res.status(status.number).send(status.message);
  };

  public authorizeRoles = (allowedRoles: UserRoleEnum) => {
    return (req: RequestWithUser, res: Response, next: NextFunction): void => {
      if (!req.user) {
        res.status(401).send("Usuario no autenticado");
      } else {
        const roleReq = req.user.role as UserRoleEnum;
        const role: UserRoleEnum = roleReq ? roleReq : UserRoleEnum.USER;

        if (!role === allowedRoles.includes(role as UserRoleEnum)) {
          res.status(403).send("No tienes permiso para esta acción");
        }
      }
      next();
    };
  };
}
