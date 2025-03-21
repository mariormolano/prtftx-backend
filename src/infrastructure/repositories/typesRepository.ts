import { dataSource } from "@infra/config";
import { Types } from "@domain/entities";
import { Properties } from "@domain/entities";

export class TypesRepository {
  private typeRepository = dataSource.getRepository(Types);
  private propertyRepository = dataSource.getRepository(Properties);

  public async findAll(): Promise<Types[]> {
    try {
      return await this.typeRepository.find({ relations: ["properties"] });
    } catch (error) {
      throw new Error("No se pudieron obtener los typos");
    }
  }

  public async findById(id: string): Promise<Types> {
    try {
      return (await this.typeRepository.findOne({
        where: { id },
        relations: ["properties"],
      })) as Types;
    } catch (error) {
      throw new Error("No se pudo encontrar el tipo");
    }
  }

  public async create(data: Types): Promise<Types> {
    const { name, description, properties } = data;

    try {
      const type = await this.typeRepository.findOne({
        where: { name: data.name },
      });
      if (type) {
        throw new Error("El tipo ya existe");
      }

      let newProperties: Properties[] = [];

      if (properties && properties.length > 0) {

        newProperties = await Promise.all(
          properties.map(async (property) => {
            const findProperty = await this.propertyRepository.findOne({
              where: { name: property.name },
            });
            if (!findProperty) {
              const newProperty = this.propertyRepository.create({
                name: property.name,
                value: property.value,
                //types: newType,
              });

              const saveProperty = await this.propertyRepository.save(
                newProperty
              );
              return saveProperty;
            }
            return findProperty;
          })
        );
      }

      const newType = this.typeRepository.create({
        name,
        description,
        properties: newProperties,
      });

      const retType = await this.typeRepository.save(newType);

      return newType;
    } catch (error) {
      throw new Error("No se pudo crear el tipo");
    }
  }

  public async update(id: string, data: Types): Promise<Types> {
    const { name, description, properties } = data;

    try {
      const updateType = await this.typeRepository.findOne({
        where: { id },
        relations: ["properties"],
      });
      if (!updateType) {
        throw new Error("El tipo no existe");
      }

      let newProperties: Properties[] = [];

      if (properties && properties.length > 0) {

        properties.map(async (property) => {
          const findProperty = await this.propertyRepository.findOne({
            where: { name: property.name },
          });
          if (!findProperty) {
            const newProperty = this.propertyRepository.create({
              name: property.name,
              value: property.value,
            });


            const saveProperty = await this.propertyRepository.save(
              newProperty
            );
            newProperties.push(saveProperty);
          } else {
            newProperties.push(findProperty);
          }
        });
      }

      updateType.name = name;
      updateType.description = description;
      updateType.properties = newProperties;

      await this.typeRepository.save(updateType);
      return (await this.typeRepository.findOne({
        where: { id },
        relations: ["properties"],
      })) as Types;
    } catch (error) {
      throw new Error("No se pudo actualizar el tipo");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const type = await this.typeRepository.findOne({
        where: { id },
        relations: ["properties"],
      });
      if (!type) {
        throw new Error("El tipo no existe");
      }

      await this.typeRepository.delete(id);
    } catch (error) {
      throw new Error("No se pudo eliminar el tipo");
    }
  }
}
