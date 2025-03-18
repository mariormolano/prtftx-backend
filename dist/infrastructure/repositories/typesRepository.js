"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesRepository = void 0;
const config_1 = require("@infra/config");
const entities_1 = require("@domain/entities");
const entities_2 = require("@domain/entities");
class TypesRepository {
    typeRepository = config_1.dataSource.getRepository(entities_1.Types);
    propertyRepository = config_1.dataSource.getRepository(entities_2.Properties);
    async findAll() {
        try {
            return await this.typeRepository.find({ relations: ["properties"] });
        }
        catch (error) {
            throw new Error("No se pudieron obtener los typos");
        }
    }
    async findById(id) {
        try {
            return (await this.typeRepository.findOne({
                where: { id },
                relations: ["properties"],
            }));
        }
        catch (error) {
            throw new Error("No se pudo encontrar el tipo");
        }
    }
    async create(data) {
        const { name, description, properties } = data;
        try {
            const type = await this.typeRepository.findOne({
                where: { name: data.name },
            });
            if (type) {
                throw new Error("El tipo ya existe");
            }
            const newType = this.typeRepository.create({ name, description });
            await this.typeRepository.save(newType);
            if (properties && properties.length > 0) {
                console.log("Propiedades: ", properties);
                properties.forEach(async (property) => {
                    const findProperty = await this.propertyRepository.findOne({
                        where: { name: property.name },
                    });
                    if (!findProperty) {
                        const newProperty = this.propertyRepository.create({
                            name: property.name,
                            typeValue: property.typeValue,
                            typeOption: property.typeOption,
                            types: newType,
                        });
                        console.log("Nueva Porpiedad: ", newProperty);
                        const saveProperty = await this.propertyRepository.save(newProperty);
                        console.log("Porpiedad Guardada: ", saveProperty);
                    }
                });
            }
            return newType;
        }
        catch (error) {
            throw new Error("No se pudo crear el tipo");
        }
    }
    async update(id, data) {
        const { name, description } = data;
        try {
            const updateType = await this.typeRepository.findOne({
                where: { id },
                relations: ["properties"],
            });
            if (!updateType) {
                throw new Error("El tipo no existe");
            }
            updateType.name = name;
            updateType.description = description;
            await this.typeRepository.save(updateType);
            return (await this.typeRepository.findOne({
                where: { id },
                relations: ["properties"],
            }));
        }
        catch (error) {
            throw new Error("No se pudo actualizar el tipo");
        }
    }
    async delete(id) {
        try {
            const type = await this.typeRepository.findOne({
                where: { id },
                relations: ["properties"],
            });
            if (!type) {
                throw new Error("El tipo no existe");
            }
            await this.typeRepository.delete(id);
        }
        catch (error) {
            throw new Error("No se pudo eliminar el tipo");
        }
    }
}
exports.TypesRepository = TypesRepository;
