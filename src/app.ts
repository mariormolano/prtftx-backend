import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const server = process.env.SERVER || "http://localhost";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`El servidor esta corriendo en ${server}:${port}`);
});
