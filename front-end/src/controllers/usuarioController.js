var usuarioModel = require("../models/usuarioModel");
var servidorModel = require("../models/servidorModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        servidorModel.buscarServidoresPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoServidores) => {
                                if (resultadoServidores.length > 0) {
                                    
                                    res.json({
                                        id_usuario: resultadoAutenticar[0].id_usuario,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        tipoAcesso: resultadoAutenticar[0].tipoAcesso,
                                        empresaId: resultadoAutenticar[0].empresaId,
                                        servidores: resultadoServidores

                                    });

                                } else {

                                    res.json({
                                        id_usuario: resultadoAutenticar[0].id_usuario,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        tipoAcesso: resultadoAutenticar[0].tipoAcesso,
                                        empresaId: resultadoAutenticar[0].empresaId,
                                        servidores: []

                                    });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var empresaId = req.body.empresaServer;

    if (nome === undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (empresaId === undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, empresaId)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};
