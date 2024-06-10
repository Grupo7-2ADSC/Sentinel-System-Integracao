var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT id_tipo_acesso, tipo FROM TipoAcesso WHERE tipo != "Administrador" AND tipo != "Representante";`;

  return database.executar(instrucaoSql);
}

module.exports = { listar };