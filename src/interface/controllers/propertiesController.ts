import { Request, Response, NextFunction } from "express";
import { PropertiesRepository } from "@infra/repositories/";
import { Properties } from "@domain/entities";
import { HttpList as HL } from "@domain/list";

const propertiesRepository = new PropertiesRepository();

export class PropertiesController {
  public async getProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const properties: Properties[] = await propertiesRepository.findAll();
      res.json({
        success: true,
        message: "Propiedades encontradas",
        properties,
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async getPropertiesById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const properties: Properties | undefined =
        await propertiesRepository.findById(id);
      if (properties) {
        res.json({
          success: true,
          message: "Propiedad encontrada",
          properties,
        });
      } else {
        next(HL.NotFound);
      }
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async createProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: Properties = req.body;

      const properties: Properties = await propertiesRepository.create(data);
      res.json({
        success: true,
        message: "Propiedad creada",
        properties,
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async updateProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data: Properties = req.body;
      ("Actualizar propiedad");

      const properties: Properties = await propertiesRepository.update(
        id,
        data
      );
      res.json({
        success: true,
        message: "Propiedad actualizada",
        properties,
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }

  public async deleteProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await propertiesRepository.delete(id);
      res.json({
        success: true,
        message: "Propiedad eliminada",
      });
    } catch (error) {
      next(HL.BadRequest);
    }
  }
}
