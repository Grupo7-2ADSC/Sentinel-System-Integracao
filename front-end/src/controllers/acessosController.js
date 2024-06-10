var acessoModel = require("../models/acessoModel");

function listar(req, res) {
  acessoModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  listar
};
