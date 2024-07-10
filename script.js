// Simulação de banco de dados (localStorage) para armazenar usuários
let users = [
    { id: 12345, telefone: '+258123456789', senha: 'senha123', saldo: 0.00 }
];

// Função para simular o login do usuário
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const telefone = document.getElementById('telefoneLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    const usuario = users.find(user => user.telefone === telefone && user.senha === senha);

    if (usuario) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';

        inicializarDashboard(usuario.id);
    } else {
        alert('Número de telefone ou senha incorretos. Por favor, tente novamente.');
    }
});

// Event listener para o link de cadastro
document.getElementById('cadastroLink').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Para se cadastrar, entre em contato conosco.');
});

// Função para inicializar o dashboard do usuário após o login
function inicializarDashboard(userID) {
    const usuario = users.find(user => user.id === userID);

    // Atualizar o ID do usuário no dashboard
    document.getElementById('userID').textContent = usuario.id;

    // Exibir saldo atual do usuário
    document.getElementById('saldo').textContent = `$${usuario.saldo.toFixed(2)}`;

    // Mostrar opções de investimento (simulação)
    const investimentoDiv = document.getElementById('opcoesInvestimento');
    investimentoDiv.innerHTML = '';

    const investimentos = [
        { valor: 200, lucro: 180 },
        { valor: 500, lucro: 450 },
        { valor: 1000, lucro: 900 }
    ];

    investimentos.forEach(investimento => {
        const radioInput = `<input type="radio" id="investimento${investimento.valor}" name="investimento" value="${investimento.valor}">
                           <label for="investimento${investimento.valor}">$${investimento.valor} - Lucro: $${investimento.lucro}</label><br>`;
        investimentoDiv.innerHTML += radioInput;
    });
}

// Função para simular o investimento
document.getElementById('investimentoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userID = parseInt(document.getElementById('userID').textContent);
    const investimento = parseFloat(document.getElementById('valorInvestimento').value);

    // Simulação de investimento (atualiza saldo após 5 segundos)
    setTimeout(() => {
        const usuario = users.find(user => user.id === userID);
        usuario.saldo += investimento;
        document.getElementById('saldo').textContent = `$${usuario.saldo.toFixed(2)}`;
        alert(`Investimento de $${investimento.toFixed(2)} realizado com sucesso!`);

        // Limpar campo de investimento
        document.getElementById('valorInvestimento').value = '';
    }, 5000); // Simula um investimento que leva 5 segundos para processar
});
