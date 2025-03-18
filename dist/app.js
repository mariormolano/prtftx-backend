"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./interface/routes");
const config_1 = require("./infrastructure/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = process.env.SERVER || "http://localhost";
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("<h1>¡El servidor está funcionando!</h1>");
});
app.use("/api", routes_1.authRouter, routes_1.typesRouter, routes_1.propertiesRouter);
config_1.dataSource
    .initialize()
    .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(port, () => {
        console.log(`El servidor esta corriendo en ${server}:${port}`);
    });
})
    .catch((error) => {
    console.error("Error al conectarse a la base de datos", error);
});
