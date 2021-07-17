const { Router } = require("express");

const router = Router();

const fs = require("fs");
const strdb = fs.readFileSync("./src/database.json", "utf-8");
const database = JSON.parse(strdb);

router.post("/alumno/create", (req, res) => {
  const newAlumno = {
    num_exp: req.body.num_exp,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fecha_nacimiento,
  };

  database.alumnos.push(newAlumno);
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});

  res.json(newAlumno);
});

router.get("/alumno/listado", (req, res) => {
  res.json(database.alumnos);
});

router.delete("/alumno/deleteall", (req, res) => {
  database.alumnos = [];
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});
  res.json(database.alumnos);
});

module.exports = router;
