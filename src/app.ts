import express from "express";
import dataSource from "./infrastructure/config/datasource";

const app = express();
const port = process.env.PORT || 3000;
const server = process.env.SERVER || "http://localhost";

app.get("/", (req, res) => {
  res.send("<h1>¡El servidor está funcionando!</h1>");
});

dataSource
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
