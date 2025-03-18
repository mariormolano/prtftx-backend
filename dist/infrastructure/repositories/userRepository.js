"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const config_1 = require("@infra/config");
const entities_1 = require("@domain/entities");
class UserRepository {
    repository = config_1.dataSource.getRepository(entities_1.User);
    async findOne(options) {
        const user = (await this.repository.findOne(options));
        return user;
    }
    async save(user) {
        const userSaved = await this.repository.save(user);
        return userSaved;
    }
    create(user) {
        const userCreated = this.repository.create(user);
        return userCreated;
    }
}
exports.UserRepository = UserRepository;
