var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.get("/buscar/:idServidor", function (req, res) {
    relatorioController.buscarDados(req, res);
});

module.exports = router;