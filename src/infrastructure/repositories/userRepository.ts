import { dataSource } from "@infra/config";
import { User } from "@domain/entities";

export class UserRepository {
  private repository = dataSource.getRepository(User);

  public async findOne(options: object): Promise<User> {
    const user = (await this.repository.findOne(options)) as User;

    return user;
  }

  public async save(user: User): Promise<User> {
    const userSaved = await this.repository.save(user);
    return userSaved;
  }

  public create(user: User): User {
    const userCreated = this.repository.create(user) as User;
    return userCreated;
  }
}
