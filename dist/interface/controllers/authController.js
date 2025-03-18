"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("@infra/repositories");
const enums_1 = require("@domain/enums");
const list_1 = require("@domain/list");
const userRepository = new repositories_1.UserRepository();
class AuthController {
    async register(req, res, next) {
        console.log("Registro de usuario");
        console.log(req.body);
        try {
            const { email, password, name, roles: rolesReq } = req.body;
            if (!email || !password || !name || !rolesReq) {
                next(list_1.HttpList.IncompleteData);
                return;
            }
            const role = rolesReq ? rolesReq : [enums_1.UserRoleEnum.USER];
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const userExists = await userRepository.findOne({
                where: { email },
            });
            if (userExists) {
                next(list_1.HttpList.EmailAlreadyRegistered);
                return;
            }
            const user = userRepository.create({
                name,
                email,
                role,
                password: hashedPassword,
            });
            await userRepository.save(user);
            next(list_1.HttpList.UserSuccessfullyRegistered);
        }
        catch (error) {
            next(list_1.HttpList.UserNoRegistered);
        }
    }
    async login(req, res, next) {
        //const userRepository = new UserRepository();
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                next(list_1.HttpList.IncompleteData);
                return;
            }
            console.log("Login body", req.body);
            const user = await userRepository.findOne({
                where: { email },
            });
            console.log(user);
            if (user && (await bcryptjs_1.default.compare(password, user.password))) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.json({
                    success: true,
                    message: "Inicio de sesión exitoso",
                    role: user.role,
                    token,
                });
            }
            else {
                next(list_1.HttpList.InvalidCredentials);
            }
        }
        catch (error) {
            next(list_1.HttpList.InternalServerError);
        }
    }
}
exports.AuthController = AuthController;
