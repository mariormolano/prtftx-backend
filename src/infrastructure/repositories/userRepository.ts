import { dataSource } from "../../infrastructure/config";
import { User } from "../../domain/entities";

export class UserRepository {
  private repository = dataSource.getRepository(User);
}
