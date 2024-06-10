var express = require("express");
var router = express.Router();

var acessosController = require("../controllers/acessosController");

router.get("/listar", function (req, res) {
  acessosController.listar(req, res);
});

module.exports = router;