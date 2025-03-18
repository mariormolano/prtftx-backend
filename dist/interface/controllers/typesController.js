"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesController = void 0;
const repositories_1 = require("@infra/repositories");
const list_1 = require("@domain/list");
const typesRepository = new repositories_1.TypesRepository();
class TypesController {
    async getTypes(req, res, next) {
        try {
            const types = await typesRepository.findAll();
            const count = types.length;
            res.json({ count, types: [types] });
        }
        catch (error) {
            next(list_1.HttpList.BadRequest);
        }
    }
    async getTypesById(req, res, next) {
        try {
            const { id } = req.params;
            const types = await typesRepository.findById(id);
            if (types) {
                res.json({ types });
            }
            else {
                next(list_1.HttpList.NotFound);
            }
        }
        catch (error) {
            next(list_1.HttpList.BadRequest);
        }
    }
    async createTypes(req, res, next) {
        try {
            const data = req.body;
            console.log(data);
            const types = await typesRepository.create(data);
            res.json(types);
        }
        catch (error) {
            next(list_1.HttpList.BadRequest);
        }
    }
    async updateTypes(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const types = await typesRepository.update(id, data);
            res.json(types);
        }
        catch (error) {
            next(list_1.HttpList.BadRequest);
        }
    }
    async deleteTypes(req, res, next) {
        try {
            const { id } = req.params;
            await typesRepository.delete(id);
            res.json({ message: "Tipo eliminado" });
        }
        catch (error) {
            next(list_1.HttpList.BadRequest);
        }
    }
}
exports.TypesController = TypesController;
