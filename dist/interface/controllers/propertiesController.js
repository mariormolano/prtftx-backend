"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesController = void 0;
const repositories_1 = require("@infra/repositories/");
const list_1 = require("@domain/list");
const propertiesRepository = new repositories_1.PropertiesRepository();
class PropertiesController {
  async getProperties(req, res, next) {
    try {
      const properties = await propertiesRepository.findAll();
      res.json({
        success: true,
        message: "Lista de propiedades",
        properties,
      });
    } catch (error) {
      next(list_1.HttpList.BadRequest);
    }
  }
  async getPropertiesById(req, res, next) {
    try {
      const { id } = req.params;
      const properties = await propertiesRepository.findById(id);
      if (properties) {
        res.json({
          success: true,
          message: "Propiedad encontrada",
          properties,
        });
      } else {
        next(list_1.HttpList.NotFound);
      }
    } catch (error) {
      next(list_1.HttpList.BadRequest);
    }
  }
  async createProperties(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      const properties = await propertiesRepository.create(data);
      res.json({
        success: true,
        message: "Propiedad creada",
        properties,
      });
    } catch (error) {
      next(list_1.HttpList.BadRequest);
    }
  }
  async updateProperties(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const properties = await propertiesRepository.update(id, data);
      res.json({
        success: true,
        message: "Propiedad actualizada",
        properties,
      });
    } catch (error) {
      next(list_1.HttpList.BadRequest);
    }
  }
  async deleteProperties(req, res, next) {
    try {
      const { id } = req.params;
      await propertiesRepository.delete(id);
      res.json({
        success: true,
        message: "Propiedad eliminada",
      });
    } catch (error) {
      next(list_1.HttpList.BadRequest);
    }
  }
}
exports.PropertiesController = PropertiesController;
