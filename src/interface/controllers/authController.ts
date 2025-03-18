import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "@infra/repositories";
import { User } from "@domain/entities";
import { UserRoleEnum } from "@domain/enums";
import { HttpList as HL } from "@domain/list";

const userRepository = new UserRepository();
export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    console.log("Registro de usuario");
    console.log(req.body);

    try {
      const { email, password, name, roles: rolesReq } = req.body;
      if (!email || !password || !name || !rolesReq) {
        next(HL.IncompleteData);
        return;
      }

      const role: UserRoleEnum = rolesReq ? rolesReq : [UserRoleEnum.USER];
      const hashedPassword = await bcrypt.hash(password, 10);

      const userExists = await userRepository.findOne({
        where: { email },
      });

      if (userExists) {
        next(HL.EmailAlreadyRegistered);
        return;
      }

      const user = userRepository.create({
        name,
        email,
        role,
        password: hashedPassword,
      } as User);

      await userRepository.save(user);

      next(HL.UserSuccessfullyRegistered);
    } catch (error) {
      next(HL.UserNoRegistered);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //const userRepository = new UserRepository();
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        next(HL.IncompleteData);
        return;
      }
      console.log("Login body", req.body);

      const user = await userRepository.findOne({
        where: { email },
      });

      console.log(user);

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );
        res.json({
          success: true,
          message: "Inicio de sesión exitoso",
          role: user.role,
          token,
        });
      } else {
        next(HL.InvalidCredentials);
      }
    } catch (error) {
      next(HL.InternalServerError);
    }
  }
}
