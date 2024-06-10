var express = require("express");
var router = express.Router();

var redefinirSenhaController = require("../controllers/redefinirSenhaController");

router.post("/atualizar", function (req, res) {
    redefinirSenhaController.atualizar(req, res);
})

router.post("/autenticar", function (req, res) {
    redefinirSenhaController.autenticar(req, res);
});

module.exports = router;