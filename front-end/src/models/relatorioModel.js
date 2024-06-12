var database = require("../database/config");

function buscarDados(idServidor, dataInicio, dataFim, parametro_max_cpu, parametro_max_memoria) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()", idServidor, dataInicio, dataFim, parametro_max_cpu, parametro_max_memoria);
    var instrucaoSql = `
        SELECT 
            COUNT(CASE WHEN tc.tipo = 'CPU' AND r.uso >= ${parametro_max_cpu} THEN 1 END) AS picos_cpu,
            COUNT(CASE WHEN tc.tipo = 'MEMORIA' AND r.uso >= ${parametro_max_memoria} THEN 1 END) AS picos_memoria,
            NULL AS nome_componente,
            NULL AS uso,
            NULL AS data_ultimo_registro
        FROM 
            Registro r
        INNER JOIN 
            Componente c ON r.fk_componente = c.id_componente
        INNER JOIN 
            TipoComponente tc ON c.fk_tipo_componente = tc.id_tipo_componente
        WHERE 
            c.fk_servidor = ${idServidor}
            AND DATE(r.data_registro) BETWEEN '${dataInicio}' AND '${dataFim}'
            AND tc.tipo IN ('CPU', 'MEMORIA')
        
        UNION ALL
        
        SELECT
            NULL AS contagem_cpu,
            NULL AS contagem_memoria,
            c.nome AS nome_componente,
            r.uso,
            r.data_registro AS data_ultimo_registro
        FROM
            Componente c
        JOIN
            TipoComponente tc ON c.fk_tipo_componente = tc.id_tipo_componente
        JOIN
            (
                SELECT
                    fk_componente,
                    MAX(data_registro) AS data_registro
                FROM
                    Registro
                WHERE
                    DATE(data_registro) BETWEEN '${dataInicio}' AND '${dataFim}'
                GROUP BY
                    fk_componente
            ) AS ult_reg ON c.id_componente = ult_reg.fk_componente
        JOIN
            Registro r ON c.id_componente = r.fk_componente AND ult_reg.data_registro = r.data_registro
        WHERE
            tc.tipo = 'DISCO'
            AND c.fk_servidor = ${idServidor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistorico(idServidor, dataInicio, dataFim) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()", idServidor, dataInicio, dataFim);
    var instrucaoSql = `
        SELECT
         c.nome AS nome_componente,
         tc.tipo AS tipo_componente,
         a.registro,
          DATE_FORMAT(a.data_registro, '%d/%m/%Y %H:00') AS data_alerta
          FROM 
         Alerta a
        INNER JOIN Componente c ON a.fk_componente = c.id_componente
        INNER JOIN Servidor s ON c.fk_servidor = s.id_servidor
        INNER JOIN TipoComponente tc ON c.fk_tipo_componente = tc.id_tipo_componente
        WHERE
        s.id_servidor = ${idServidor}
        AND DATE(a.data_registro) BETWEEN '${dataInicio}' AND '${dataFim}'
        ORDER BY
        a.data_registro DESC;
                       `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDados,
    buscarHistorico
}
