var express = require("express");
var router = express.Router();

var parametrosAlertaController = require("../controllers/parametrosAlertaController");

router.get("/:empresaId", function (req, res) {
  parametrosAlertaController.buscarParametrosPorEmpresa(req, res);
});

module.exports = router;