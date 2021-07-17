const { Router } = require("express");

const fs = require("fs");
const strdb = fs.readFileSync("./src/database.json", "utf-8");
const database = JSON.parse(strdb);

const router = Router();

router.post("/profesores/create", (req, res) => {
  const newProfesor = {
    dni: req.body.dni,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
  };

  database.profesores.push(newProfesor);
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});
  res.json(newProfesor);
});

router.get("/profesores/listado", (req, res) => {
  res.json(database.profesores);
});

router.delete("/profesores/deleteall", (req, res) => {
  database.profesores = [];
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});
  res.json(database.profesores);
});

module.exports = router;
