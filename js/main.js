/* Funcao para evitar erros, faz esperar o HTML inteiro ser carregado para depois executar o JS */

document.addEventListener('DOMContentLoaded', function () {
    configurarSaudacao();
    configurarDataMinimaAgendamento();
    configurarFormCadastro();
    configurarEnderecoTelebusca();
    configurarFormAgendamento();
    configurarBotaoVoltarTopo();
});

/* Saudação dinâmica (home) */
function configurarSaudacao() {
    const saudacaoEl = document.getElementById('saudacao');
    /* Uso do If para evitar erros, se nao encontrar o elemento, para a funcao */
    if (!saudacaoEl) return;

    const agora = new Date();
    const horas = agora.getHours();
    let saudacaoTexto = '';

    if (horas < 12) {
        saudacaoTexto = 'Bom dia';
    } else if (horas < 18) {
        saudacaoTexto = 'Boa tarde';
    } else {
        saudacaoTexto = 'Boa noite';
    }

    const dataFormatada = agora.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    saudacaoEl.textContent = `${saudacaoTexto}! Hoje é ${dataFormatada}. Cuide do seu pet com a PetShop Animale.`;
}

/* Define a data mínima de agendamento como hoje */
function configurarDataMinimaAgendamento() {
    const dataAgendamento = document.getElementById('dataAgendamento');
    /* Uso do If para evitar erros, se nao encontrar o elemento, para a funcao */
    if (!dataAgendamento) return;
    /* Formata a data para o padrao AAAA-MM-DD */
    const hojeISO = new Date().toISOString().split('T')[0];
    /* Para controle de dataminima no agendamento (O usuario nao pode agendar servicos para ontem) */
    dataAgendamento.min = hojeISO;
}

/* Formulário de CADASTRO (cadastro.html) */
function configurarFormCadastro() {
    const form = document.getElementById('form-cadastro');
    const mensagem = document.getElementById('mensagem-cadastro');

    if (!form || !mensagem) return;

    form.addEventListener('submit', function (event) {
        /* Impede o navegador de recarregar a pagina. */
        event.preventDefault();
        /* Validacao se os campos requiridos estao preenchidos */
        if (!form.checkValidity()) {
            /* Class do Bootstrap para deixar os campos requiridos nao preenchidos em vermelho */
            form.classList.add('was-validated');
            return;
        }

        const nomeCliente = document.getElementById('nomeCliente').value;
        const nomePet = document.getElementById('nomePet').value;

        mensagem.classList.remove('d-none', 'alert-danger');
        mensagem.classList.add('alert-success');
        mensagem.textContent =
            `Cadastro realizado com sucesso! ` +
            `${nomeCliente}, o pet ${nomePet} já está registrado em nosso sistema.`;

        form.reset();
        form.classList.remove('was-validated');
    });
}

/* Mostra/esconde endereço quando a opção Tele-busca é escolhida */
function configurarEnderecoTelebusca() {
    const radioTelebusca = document.getElementById('metodoTelebusca');
    const radioLocal = document.getElementById('metodoLocal');
    const grupoEndereco = document.getElementById('grupo-endereco-telebusca');
    const inputEndereco = document.getElementById('enderecoTelebusca');

    if (!radioTelebusca || !radioLocal || !grupoEndereco || !inputEndereco) return;
    /* Remove o d-none, mostrando o campo de endereco quando usuario escolhe a telebusca */
    function atualizarVisibilidade() {
        if (radioTelebusca.checked) {
            grupoEndereco.classList.remove('d-none');
            inputEndereco.required = true;
        } else {
            grupoEndereco.classList.add('d-none');
            inputEndereco.required = false;
            inputEndereco.value = '';
        }
    }

    radioTelebusca.addEventListener('change', atualizarVisibilidade);
    radioLocal.addEventListener('change', atualizarVisibilidade);

    // estado inicial
    atualizarVisibilidade();
}

/* Formulário de AGENDAMENTO (agendamento.html) */
function configurarFormAgendamento() {
    const form = document.getElementById('form-agendamento');
    const mensagem = document.getElementById('mensagem-agendamento');

    if (!form || !mensagem) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const nomeCliente = document.getElementById('nomeClienteAg').value;
        const nomePet = document.getElementById('nomePetAg').value;
        const telefone = document.getElementById('telefoneAg').value;
        const servicoSelecionado = document.querySelector('input[name="servico"]:checked');
        const metodoSelecionado = document.querySelector('input[name="metodo"]:checked');
        const data = document.getElementById('dataAgendamento').value;
        const hora = document.getElementById('horaAgendamento').value;
        const endereco = document.getElementById('enderecoTelebusca')
            ? document.getElementById('enderecoTelebusca').value
            : '';

        const servicoTexto = servicoSelecionado ? servicoSelecionado.value : 'serviço não informado';
        const metodoTexto = metodoSelecionado ? metodoSelecionado.value : 'forma de atendimento não informada';

        let mensagemTexto =
            `Agendamento confirmado! ` +
            `${nomeCliente}, o ${servicoTexto.toLowerCase()} do pet ${nomePet} ` +
            `(${metodoTexto}) está marcado para ${data} às ${hora}. `;

        if (metodoTexto === 'Tele-busca' && endereco) {
            mensagemTexto += `Nossa equipe irá até o endereço: ${endereco}. `;
        }

        if (telefone) {
            mensagemTexto += `Entraremos em contato pelo telefone ${telefone}.`;
        }

        mensagem.classList.remove('d-none', 'alert-danger');
        mensagem.classList.add('alert-success');
        mensagem.textContent = mensagemTexto;

        form.reset();
        form.classList.remove('was-validated');
    });
}

/* Botão voltar ao topo (index) */
function configurarBotaoVoltarTopo() {
    const btn = document.getElementById('btn-voltar-topo');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        /* Se a tela for maior que 300px, mostra o botao. Se nao, esconde. */
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
