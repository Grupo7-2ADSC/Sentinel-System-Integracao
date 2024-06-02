function adicionarNovoAcesso(){
    window.location.href = "../adm/adicionarAcesso.html";
}
document.addEventListener('DOMContentLoaded', function() {
const userProfile = document.getElementById('user-profile');
const userCard = document.getElementById('user-card');
const logoutBtn = document.getElementById('logout-btn');
const acessosTableBody = document.querySelector('#acessosTable tbody');


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




// tabela de acesso


const acessos = [
    {id: 0, tipoAcesso: 'ADM'},
    {id: 1 , tipoAcesso: 'Representante'},
    {id: 2 , tipoAcesso: 'Gestor de infra'},
    {id: 3 , tipoAcesso: 'Usuario Padrão'}
];



// Função para preencher a tabela

function preencherTabela(acessos) {
   acessos.forEach(acessos => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${acessos.id}</td>
            <td>${acessos.tipoAcesso}</td>
            <td>
                <button class="edit" onclick="editarAcessos(${acessos.id})">Editar</button>
                <button class="delete" onclick="deletarAcesso(${acessos.id})">Deletar</button>
            </td>
        `;
        acessosTableBody.appendChild(row);
    });
}


// Função para editar um usuario
window.editarAcesso= function(id) {
    const acess = acess.find(acs => acs.id === id);
    if (acess) {
        const nome = prompt('Editar nome do acesso:', acess.nome);
        if (nome ) {
            acess.nome = nome;
            
            atualizarTabela();
        }
    }
}




// Função para deletar uma usuario
window.deletarAcesso = function(id) {
    const index = acessos.findIndex(src => src.id === id);
    if (index > -1) {
        acessos.splice(index, 1);
        atualizarTabela();
    }
}

// Função para atualizar a tabela
function atualizarTabela() {
    acessosTableBody.innerHTML = '';
    preencherTabela(acessos);
}

// Preencher a tabela com os dados simulados
preencherTabela(acessos);

});