var mysql = require("mysql2");

var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao, params) {
    return new Promise((resolve, reject) => {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, params, (erro, resultados) => {
            conexao.end();
            if (erro) {
                reject(erro);
            } else {
                resolve(resultados);
            }
        });
        conexao.on('error', erro => {
            console.error("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};
