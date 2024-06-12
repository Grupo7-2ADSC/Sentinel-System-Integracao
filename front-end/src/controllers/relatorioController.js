var relatorioModel = require("../models/relatorioModel");

function buscarDados(req, res) {
    var idServidor = req.params.idServidor;
    var dataInicio = req.query.dataInicio;
    var dataFim = req.query.dataFim;
    var parametro_max_cpu = req.query.parametro_max_cpu;
    var parametro_max_memoria = req.query.parametro_max_memoria;

    relatorioModel.buscarDados(idServidor, dataInicio, dataFim, parametro_max_cpu, parametro_max_memoria)
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
                    "Houve um erro ao consultar os dados: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarHistorico(req, res) {
    var idServidor = req.params.idServidor;
    var dataInicio = req.query.dataInicio;
    var dataFim = req.query.dataFim;

    relatorioModel.buscarHistorico(idServidor, dataInicio, dataFim)
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
                    "Houve um erro ao consultar o historico: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarDados,
    buscarHistorico
}