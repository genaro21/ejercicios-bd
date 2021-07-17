const express = require("express");

const server = express();

//Settings
server.use(express.json());

//Routes
const routes = require("./routes");

server.use(routes.alumnos);
server.use(routes.profesores);
server.use(routes.cursos);
server.use(routes.modulos);
server.use(routes.veterinaria);

module.exports = server;
