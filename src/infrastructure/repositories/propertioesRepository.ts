import { dataSource } from "@infra/config";
import { Properties } from "@domain/entities";

export class PropertiesRepository {
  private propertiesRepository = dataSource.getRepository(Properties);

  public async findAll(): Promise<Properties[]> {
    const count = await this.propertiesRepository.count();
    console.log(`Total properties: ${count}`);

    //try {
    const properties = await this.propertiesRepository.find();

    console.log(properties);
    return properties;
    // } catch (error) {
    //   throw new Error("No se pudieron obtener las propiedades");
    // }
  }

  public async findById(id: string): Promise<Properties> {
    try {
      return (await this.propertiesRepository.findOne({
        where: { id },
        relations: ["types"],
      })) as Properties;
    } catch (error) {
      throw new Error("No se pudo encontrar la propiedad");
    }
  }

  public async create(data: Properties): Promise<Properties> {
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

  public async update(id: string, data: Properties): Promise<Properties> {
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
      return (await this.propertiesRepository.findOne({
        where: { id },
      })) as Properties;
    } catch (error) {
      throw new Error("No se pudo actualizar la propiedad");
    }
  }

  public async delete(id: string): Promise<void> {
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
