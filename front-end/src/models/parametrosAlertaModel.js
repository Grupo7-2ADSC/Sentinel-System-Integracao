var database = require("../database/config");

function buscarParametrosPorEmpresa(empresaId) {

  instrucaoSql = `SELECT ca.parametro_min, ca.parametro_max, ca.fk_empresa, tc.tipo AS tipo_componente FROM ConfiguracaoAlerta ca
                  INNER JOIN TipoComponente tc ON ca.fk_tipo_componente = tc.id_tipo_componente
                  WHERE ca.fk_empresa = ${empresaId};
                  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarParametrosPorEmpresa
}