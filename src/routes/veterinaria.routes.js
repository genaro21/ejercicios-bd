const { Router } = require("express");

const uuid = require("uuid");

const fs = require("fs");
const strdb = fs.readFileSync("./src/database.json", "utf-8");
const database = JSON.parse(strdb);

const router = Router();

router.post("/veterinaria/cliente", (req, res) => {
  const newCliente = {
    id: uuid.v4(),
    name: req.body.name,
    perros: [],
  };
  database.clientes.push(newCliente);
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});

  res.json(newCliente);
});

router.post("/veterinaria/perro", (req, res) => {
  const newPerro = {
    id: uuid.v4(),
    nombre: req.body.nombre,
  };
  database.perros.push(newPerro);
  let cliente = null;
  for (let i = 0; i < database.clientes.length; i++) {
    if (req.body.idcliente === database.clientes[i].id) {
      cliente = database.clientes[i];
      database.clientes[i].perros.push(newPerro.id);
      break;
    }
  }
  fs.writeFile("./src/database.json", JSON.stringify(database), () => {});
  res.json(cliente);
});

module.exports = router;
