var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O MODEL DE USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);

    var query = `
    SELECT Usuario.id_usuario, Usuario.nome, Usuario.email, TipoAcesso.tipo AS tipoAcesso, Usuario.fk_empresa AS empresaId
    FROM Usuario 
    JOIN TipoAcesso ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso
    WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query, [email, senha]);
}

function cadastrarUsuarioInterno(nome, email, senha, acessoId, empresaId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, fk_tipo_acesso, fk_empresa) VALUES (?, ?, ?, ?, ?);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, email, senha, acessoId, empresaId]);
}

function listar(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
       SELECT Usuario.nome, Usuario.email, TipoAcesso.tipo AS tipo_acesso 
       FROM Usuario JOIN TipoAcesso 
       ON Usuario.fk_tipo_acesso = TipoAcesso.id_tipo_acesso 
       WHERE fk_empresa = ${idEmpresa}; 
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(nomeUsuario) {
    var instrucaoSql = `
        DELETE FROM Usuario WHERE nome = '${nomeUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrarUsuarioInterno,
    listar,
    deletar
};
