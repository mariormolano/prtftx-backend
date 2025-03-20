"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesRepository = void 0;
const config_1 = require("@infra/config");
const entities_1 = require("@domain/entities");
class PropertiesRepository {
  propertiesRepository = config_1.dataSource.getRepository(
    entities_1.Properties
  );
  async findAll() {
    console.log("findAll");
    const count = await this.propertiesRepository.count();
    console.log(`Total properties: ${count}`);
    try {
      const properties = await this.propertiesRepository.find({
        relations: ["types"],
      });
      console.log(properties);
      return properties;
    } catch (error) {
      throw new Error("No se pudieron obtener las propiedades");
    }
  }
  async findById(id) {
    try {
      return await this.propertiesRepository.findOne({
        where: { id },
        relations: ["types"],
      });
    } catch (error) {
      throw new Error("No se pudo encontrar la propiedad");
    }
  }
  async create(data) {
    try {
      const properties = await this.propertiesRepository.findOne({
        where: { name: data.name },
      });
      if (properties) {
        throw new Error("La propiedad ya existe");
      }
      return await this.propertiesRepository.save(data);
    } catch (error) {
      throw new Error("No se pudo crear la propiedad");
    }
  }
  async update(id, data) {
    const { name, value } = data;
    try {
      const properties = await this.propertiesRepository.findOne({
        where: { id },
      });
      if (!properties) {
        throw new Error("La propiedad no existe");
      }
      properties.name = name;
      properties.value = value;
      await this.propertiesRepository.save(properties);
      return await this.propertiesRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new Error("No se pudo actualizar la propiedad");
    }
  }
  async delete(id) {
    try {
      const properties = await this.propertiesRepository.findOne({
        where: { id },
      });
      if (!properties) {
        throw new Error("La propiedad no existe");
      }
      await this.propertiesRepository.delete(id);
    } catch (error) {
      throw new Error("No se pudo eliminar la propiedad");
    }
  }
}
exports.PropertiesRepository = PropertiesRepository;
