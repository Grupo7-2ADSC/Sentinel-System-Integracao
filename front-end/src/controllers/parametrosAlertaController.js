var parametrosAlertaModel = require("../models/parametrosAlertaModel");

function buscarParametrosPorEmpresa(req, res) {
  var empresaId = req.params.empresaId;

  parametrosAlertaModel.buscarParametrosPorEmpresa(empresaId).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os parametros: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function verificarParametro(req, res) {
  var idHardware = req.params.idHardware;
  var empresaId = req.body.empresaServer;

  parametrosAlertaModel.verificarParametro(idHardware, empresaId)
    .then(function (existe) {
      res.json({ existe: existe });
    })
    .catch(function (erro) {
      console.log("\nErro ao verificar parâmetro:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function atualizarParametro(req, res) {
  var idHardware = req.params.idHardware;
  var parametroMin = req.body.parametroMinServer;
  var parametroMax = req.body.parametroMaxServer;
  var empresaId = req.body.empresaServer;

  if (idHardware == undefined) {
    res.status(400).send("Seu Hardware está undefined!");
  } else if (parametroMin == undefined) {
    res.status(400).send("Seu Parâmetro Minímo está undefined!");
  } else if (parametroMax == undefined) {
    res.status(400).send("Seu Parâmetro Máximo está undefined!");
  } else if (empresaId == undefined) {
    res.status(400).send("Sua Empresa está undefined!");
  } else {

    parametrosAlertaModel.atualizarParametro(idHardware, parametroMin, parametroMax, empresaId)
      .then(resultado => {
        res.json(resultado);
      })
      .catch(erro => {
        console.log("\nErro ao atualizar parâmetro", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });

  }
}

function cadastrarParametro(req, res) {
  var idHardware = req.params.idHardware;
  var parametroMin = req.body.parametroMinServer;
  var parametroMax = req.body.parametroMaxServer;
  var empresaId = req.body.empresaServer;

  if (idHardware == undefined) {
    res.status(400).send("Seu Hardware está undefined!");
  } else if (parametroMin == undefined) {
    res.status(400).send("Seu Parâmetro Minímo está undefined!");
  } else if (parametroMax == undefined) {
    res.status(400).send("Seu Parâmetro Máximo está undefined!");
  } else if (empresaId == undefined) {
    res.status(400).send("Sua Empresa está undefined!");
  } else {

    parametrosAlertaModel.cadastrarParametro(idHardware, parametroMin, parametroMax, empresaId)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao cadastrar o parametro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function listar(req, res) {
  var idEmpresa = req.params.empresaVar;

  parametrosAlertaModel.listar(idEmpresa)
      .then(
          function (resultado) {
              if (resultado.length > 0) {
                  res.status(200).json(resultado);
              } else {
                  res.status(204).send("Nenhum parâmetro encontrado!");
              }
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log(
                  "Houve um erro ao buscar os parâmetros: ",
                  erro.sqlMessage
              );
              res.status(500).json(erro.sqlMessage);
          }
      );
}

module.exports = {
  buscarParametrosPorEmpresa,
  verificarParametro,
  atualizarParametro,
  cadastrarParametro,
  listar
}