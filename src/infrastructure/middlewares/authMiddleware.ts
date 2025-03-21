import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@domain/entities";
import { UserRepository } from "@infra/repositories";

import { HttpList as HL } from "@domain/list";

interface RequestWithUser extends Request {
  user?: User;
}

const userRepository = new UserRepository();

export class AuthMiddleware {
  public async authenticateJWT(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.header("Authorization")?.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          id: number;
        };

        const user = (await userRepository.findOne({
          where: { id: decoded.id },
        })) as User;

        if (user) {
          req.user = user;
          next();
        } else {
          next(HL.UserNotFound);
        }
      } catch (error) {
        next(HL.InvalidToken);
      }
    } else {
      next(HL.TokenNotProvided);
    }
  }
}
