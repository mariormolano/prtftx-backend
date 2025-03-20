import { Request, Response, NextFunction } from "express";
import { TypesRepository } from "@infra/repositories";
import { Types } from "@domain/entities";
import { HttpList as HL } from "@domain/list";

const typesRepository = new TypesRepository();

export class TypesController {
  public async getTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const types: Types[] = await typesRepository.findAll();
      const count = types.length;
      res.json({ count, types: [types] });
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async getTypesById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const types: Types | undefined = await typesRepository.findById(id);
      if (types) {
        res.json({ types });
      } else {
        next(HL.NotFound);
      }
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async createTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: Types = req.body;

      const types: Types = await typesRepository.create(data);
      res.json({
        success: true,
        message: "Tipo creado",
        types,
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async updateTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data: Types = req.body;
      console.log("Actualizando tipo id", id, data);

      const types: Types = await typesRepository.update(id, data);
      res.json({
        success: true,
        message: "Tipo actualizado",
        types,
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async deleteTypes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await typesRepository.delete(id);
      res.json({
        success: true,
        message: "Tipo borrado",
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }
}
