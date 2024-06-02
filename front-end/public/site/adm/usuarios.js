function cadastrarUsuario(){
    window.location.href = "../adm/cadastroUsuarios.html";
}
document.addEventListener('DOMContentLoaded', function() {
const userProfile = document.getElementById('user-profile');
const userCard = document.getElementById('user-card');
const logoutBtn = document.getElementById('logout-btn');
const usersTableBody = document.querySelector('#usersTable tbody');


userProfile.addEventListener('click', function() {
    userCard.classList.toggle('active');
});


document.addEventListener('click', function(event) {
    if (!userProfile.contains(event.target) && !userCard.contains(event.target)) {
        userCard.classList.remove('active');
    }
});





logoutBtn.addEventListener('click', function() {
    window.location.href = '../site/public/index.html';
});




// tabela de usuarios


const usuarios = [
    {id:1 , nome: 'Pedro', email: 'AAA@AAA', senha: 1, tipoAcesso:1, dataCadastro: '2023-01-01' },
    {id:2 , nome: 'Vedro', email: 'AAA@TTT', senha: 2, tipoAcesso:2, dataCadastro: '2023-01-02' },
];



// Função para preencher a tabela

function preencherTabela(usuarios) {
    usuarios.forEach(usuarios => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuarios.nome}</td>
            <td>${usuarios.email}</td>
            <td> ${usuarios.senha}</td>
            <td> ${usuarios.tipoAcesso}</td>
            <td>${usuarios.dataCadastro}</td>
            <td>
                <button class="edit" onclick="editarusuario(${usuarios.id})">Editar</button>
                <button class="delete" onclick="deletarusuario(${usuarios.id})">Deletar</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}


// Função para editar um usuario
window.editarusuario = function(id) {
    const usuario = usuarios.find(usr => usr.id === id);
    if (usuario) {

        const nome = prompt('Editar nome da usuario:', usuario.nome);
        const email = prompt('Editar email da usuario:', usuario.email);
        const senha = prompt('Editar senha do usuario:', usuario.senha);
 
        if (nome && email && senha) {
            usuario.nome = nome;
            usuario.email = email;
            usuario.senha = senha;
            atualizarTabela();
        }
    }
}




// Função para deletar uma usuario
window.deletarusuario = function(id) {
    const index = usuarios.findIndex(src => src.id === id);
    if (index > -1) {
        usuarios.splice(index, 1);
        atualizarTabela();
    }
}

// Função para atualizar a tabela
function atualizarTabela() {
    usersTableBody.innerHTML = '';
    preencherTabela(usuarios);
}

// Preencher a tabela com os dados simulados
preencherTabela(usuarios);

});