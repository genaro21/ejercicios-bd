const { Router } = require("express");

const uuid = require("uuid");

const fs = require("fs");
const { modulos } = require(".");
const strdb = fs.readFileSync("./src/database.json", "utf-8");
const database = JSON.parse(strdb);

const router = Router();

router.post("/cursos/create", (req, res) => {
  const { codigo, delegado } = req.body;
  const newCurso = {
    id: uuid.v4(),
    codigo,
    delegado,
  };

  database.cursos.push(newCurso);
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});
  res.json(newCurso);
});

router.get("/cursos/listado", (req, res) => {
  res.json(database.cursos);
});

router.get("/cursos/alumnos/:idcurso", (req, res) => {
  console.log(req.params);
  const { idcurso } = req.params;

  let curso = null;
  for (let i = 0; i < database.cursos.length; i++) {
    if (idcurso === database.cursos[i].id) {
      curso = database.cursos[i];
      break;
    }
  }

  if (curso === null) {
    return res.json("El id del curso no existe");
  }

  let modulo = null;
  for (let i = 0; i < database.modulos.length; i++) {
    if (curso.codigo === database.modulos[i].codigo) {
      modulo = database.modulos[i];
      break;
    }
  }
  if (modulo === null) {
    return res.json("El módulo no existe");
  }
  const data = {
    alumnos: modulo.alumnos,
    total: modulo.alumnos.length,
  };
  res.json(data);
});

router.get("/curso/delegados", (req, res) => {
  const delegados = [];
  for (let i = 0; i < database.cursos.length; i++) {
    delegados.push(database.cursos[i].delegado);
  }
  res.json(delegados);
});

module.exports = router;
