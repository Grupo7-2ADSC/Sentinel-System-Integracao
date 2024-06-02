var redefinirSenhaModel = require("../models/redefinirSenhaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;

    if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        redefinirSenhaModel.autenticar(email)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json({
                      
                        email: resultadoAutenticar[0].email,

                    });
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email inválido");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo e-mail!");
                }
            })
            .catch(erro => {
                console.log("\nHouve um erro ao buscar e-mail! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function atualizar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo esqueceuSenha.html
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!");
    }

        redefinirSenhaModel.atualizar(senha, email)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar a senha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

module.exports = {
    autenticar,
    atualizar
};