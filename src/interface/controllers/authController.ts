import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dataSource } from "../../infrastructure/config";
import { User } from "../../domain/entities";
import { UserRoleEnum } from "../../domain/enums";

export class AuthController {
  // Registra un usuario en la base de datos
  public async register(req: Request, res: Response) {
    console.log("Registro de usuario");
    console.log(req.body);

    try {
      const { email, password, name, roles: relesReq } = req.body;
      if (!email || !password || !name || !relesReq) {
        res.status(400).json({
          success: false,
          message: "Datos incompletos",
        });
        return;
      }

      const role: UserRoleEnum = relesReq ? relesReq : [UserRoleEnum.USER];
      const hashedPassword = await bcrypt.hash(password, 10);

      const userExists = await dataSource.getRepository(User).findOne({
        where: { email },
      });

      if (userExists) {
        res.status(400).json({
          success: false,
          message: "El correo ya está registrado",
        });
        return;
      }

      const user = dataSource.getRepository(User).create({
        name,
        email,
        role,
        password: hashedPassword,
      });

      await dataSource.getRepository(User).save(user);
      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al registrar el usuario",
        error,
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    //    try {
    const { email, password } = req.body;
    const user = await dataSource.getRepository(User).findOne({
      where: { email },
      //relations: ["role"],
    });

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
      res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }
    // } catch (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: error,
    //   });
    // }
  }
}
