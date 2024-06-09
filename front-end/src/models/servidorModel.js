var database = require("../database/config");

function buscarServidoresPorEmpresa(empresaId) {

  instrucaoSql = `SELECT * FROM Servidor WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarServidoresPorEmpresa
}