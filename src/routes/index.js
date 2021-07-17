const alumnos = require("./alumnos.routes");

const profesores = require("./profesores.routes");

const cursos = require("./cursos.routes");

const modulos = require("./modulos.routes");

const veterinaria = require("./veterinaria.routes");

module.exports = {
  alumnos,
  profesores,
  cursos,
  modulos,
  veterinaria,
};
