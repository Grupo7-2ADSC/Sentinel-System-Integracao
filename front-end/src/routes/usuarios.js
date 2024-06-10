var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarUsuarioInterno", function (req, res) {
    usuarioController.cadastrarUsuarioInterno(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    usuarioController.listar(req, res);
});

router.delete("/deletar/:nomeUsuario", function (req, res) {
    usuarioController.deletar(req, res);
});

module.exports = router;