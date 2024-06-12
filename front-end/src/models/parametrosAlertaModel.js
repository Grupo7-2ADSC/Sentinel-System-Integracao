var database = require("../database/config");

function buscarParametrosPorEmpresa(empresaId) {

  instrucaoSql = `SELECT ca.parametro_min, ca.parametro_max, ca.fk_empresa, tc.tipo AS tipo_componente FROM ConfiguracaoAlerta ca
                  INNER JOIN TipoComponente tc ON ca.fk_tipo_componente = tc.id_tipo_componente
                  WHERE ca.fk_empresa = ${empresaId};
                  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function verificarParametro(idHardware, empresaId) {
  instrucaoSql = `
      SELECT COUNT(*) AS total FROM ConfiguracaoAlerta 
      WHERE fk_tipo_componente = ${idHardware} AND fk_empresa = ${empresaId};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql)
}

function atualizarParametro(idHardware, parametroMin, parametroMax, empresaId) {
  var instrucaoSql = `
    UPDATE ConfiguracaoAlerta 
    SET parametro_min = ${parametroMin}, parametro_max = ${parametroMax}
    WHERE fk_tipo_componente = ${idHardware} AND fk_empresa = ${empresaId};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarParametro(parametroMin, parametroMax, idHardware, empresaId) {
  var instrucaoSql = `
    INSERT INTO ConfiguracaoAlerta (parametro_min, parametro_max, fk_tipo_componente,  fk_empresa) 
    VALUES (?, ?, ?, ?);
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [parametroMin, parametroMax, idHardware, empresaId]);
}

function listar(idEmpresa) {
  var instrucaoSql = `
     SELECT 
    ca.parametro_min AS min,
    ca.parametro_max AS max,
    tc.tipo AS nome_componente
     FROM 
    ConfiguracaoAlerta ca
     INNER JOIN 
    TipoComponente tc ON ca.fk_tipo_componente = tc.id_tipo_componente
     INNER JOIN 
    Empresa e ON ca.fk_empresa = e.id_empresa
     WHERE 
    ca.fk_empresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarParametrosPorEmpresa,
  verificarParametro,
  atualizarParametro,
  cadastrarParametro,
  listar
}