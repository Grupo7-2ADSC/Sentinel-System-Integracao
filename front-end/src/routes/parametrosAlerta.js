var express = require("express");
var router = express.Router();

var parametrosAlertaController = require("../controllers/parametrosAlertaController");

router.get("/:empresaId", function (req, res) {
  parametrosAlertaController.buscarParametrosPorEmpresa(req, res);
});

router.post("/verificarParametro/:idHardware", function (req, res) {
  parametrosAlertaController.verificarParametro(req, res);
});

router.put("/atualizarParametro/:idHardware", function (req, res) {
  parametrosAlertaController.atualizarParametro(req, res);
});

router.post("/cadastrarParametro/:idHardware", function (req, res) {
  parametrosAlertaController.cadastrarParametro(req, res);
});

router.get("/listar/:empresaVar", function (req, res) {
  parametrosAlertaController.listar(req, res);
});

module.exports = router;