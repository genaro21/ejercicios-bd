const { Router } = require("express");

const fs = require("fs");
const strdb = fs.readFileSync("./src/database.json", "utf-8");
const database = JSON.parse(strdb);

const router = Router();

router.post("/modulos/create", (req, res) => {
  const { codigo, nombre, profesor, alumnos } = req.body;
  const newModulo = {
    codigo,
    nombre,
    profesor,
    alumnos,
  };
  database.modulos.push(newModulo);
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});
  res.json(newModulo);
});

router.get("/modulos/listado", (req, res) => {
  res.json(database.modulos);
});

module.exports = router;
