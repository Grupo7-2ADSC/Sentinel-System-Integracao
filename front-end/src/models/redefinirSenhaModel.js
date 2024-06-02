var database = require("../database/config");

function autenticar(email) {
    console.log("ACESSEI O MODEL DE USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email);

    var query = `
    SELECT email FROM Usuario WHERE email = '${email}';
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [email]);
}

function atualizar(senha, email) {
    console.log("ACESSEI O MODEL DE USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", senha, email);

    var query = `
    UPDATE Usuario SET senha = '${senha}' WHERE email = '${email}';
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [senha, email]);
}

module.exports = {
    autenticar,
    atualizar
};
