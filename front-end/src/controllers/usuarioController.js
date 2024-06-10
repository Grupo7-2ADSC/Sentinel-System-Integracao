var usuarioModel = require("../models/usuarioModel");
var servidorModel = require("../models/servidorModel");
var parametrosAlertaModel = require("../models/parametrosAlertaModel");

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
                        var usuario = resultadoAutenticar[0];

                        console.log(resultadoAutenticar);
                        servidorModel.buscarServidoresPorEmpresa(usuario.empresaId)
                            .then(function (resultadoServidores) {
                                parametrosAlertaModel.buscarParametrosPorEmpresa(usuario.empresaId)
                                    .then(function (resultadoParametros) {
                                        res.json({
                                            id_usuario: usuario.id_usuario,
                                            email: usuario.email,
                                            nome: usuario.nome,
                                            tipoAcesso: usuario.tipoAcesso,
                                            empresaId: usuario.empresaId,
                                            servidores: resultadoServidores.length > 0 ? resultadoServidores : [],
                                            parametros: resultadoParametros.length > 0 ? resultadoParametros : []
                                        });
                                    })
                                    .catch(function (erroAlertas) {
                                        console.log("Houve um erro ao buscar os parâmetros de alerta: ", erroAlertas.sqlMessage);
                                        res.status(500).json(erroAlertas.sqlMessage);
                                    });
                            })
                            .catch(function (erroServidores) {
                                console.log("Houve um erro ao buscar os servidores: ", erroServidores.sqlMessage);
                                res.status(500).json(erroServidores.sqlMessage);
                            });
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

function cadastrarUsuarioInterno(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var acessoId = req.body.acessoIdServer;
    var empresaId = req.body.empresaIdServer;

    if (nome === undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (acessoId === undefined) {
        res.status(400).send("Seu acesso está undefined!");
    } else if (empresaId === undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {
        usuarioModel.cadastrarUsuarioInterno(nome, email, senha, acessoId, empresaId)
            .then(resultado => {
                res.json(resultado);
            })
            .catch(erro => {
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    usuarioModel.listar(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os usuarios: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletar(req, res) {
    var nomeUsuario = req.params.nomeUsuario;

    usuarioModel.deletar(nomeUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o usuário: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    autenticar,
    cadastrarUsuarioInterno,
    listar,
    deletar
};
