// ------------------------------
// INÍCIO: Filtro da lista de chats
// ------------------------------

// Seleciona o input onde o usuário digita para filtrar os contatos (chat list)
const filterElement = document.querySelector('#filter');
filterElement.autocomplete = "off";

// Seleciona todos os elementos com a classe "block" dentro de "chatlist", que representam os chats
const cards = document.querySelectorAll('.chatlist .block');

// Adiciona um ouvinte de evento para detectar quando o usuário digita algo no campo de filtro
filterElement.addEventListener('input', filterCards);

// Função que realiza o filtro dos cards com base no nome do contato
function filterCards() {
    const filterValue = filterElement.value.toLowerCase(); // Converte o texto digitado para minúsculo

    cards.forEach(card => {
        // Pega o nome do contato (título do card)
        const title = card.querySelector('h4').textContent.toLowerCase();

        // Verifica se o nome do contato contém o texto digitado
        if (title.includes(filterValue)) {
            card.style.display = 'flex'; // Mostra o card
        } else {
            card.style.display = 'none'; // Esconde o card
        }
    });
}
// ------------------------------
// FIM: Filtro da lista de chats
// ------------------------------


// ------------------------------
// INÍCIO: Filtro das mensagens (última mensagem exibida)
// ------------------------------

// Seleciona o campo de input onde o usuário digita para buscar mensagens
const filterMessageElement = document.querySelector('#messagesearch');
filterMessageElement.autocomplete = "off";

// Adiciona um ouvinte de evento para o input — a função será chamada a cada tecla digitada
filterMessageElement.addEventListener('input', filterCardsMessage);

// Função que filtra as mensagens já enviadas na conversa
function filterCardsMessage() {
    // Pega o valor digitado no campo de busca e converte para letras minúsculas
    const filterValue = filterMessageElement.value.toLowerCase();

    // Seleciona todas as mensagens da conversa (cada <li> dentro de #right-messages)
    const cardsMessage = document.querySelectorAll('#right-messages li');

    // Percorre cada item de mensagem
    cardsMessage.forEach(card => {
        let message = ''; // Inicializa a variável que vai guardar o conteúdo da mensagem

        // Tenta encontrar o conteúdo da mensagem nos elementos possíveis: <p>, <a>, ou <img>
        const p = card.querySelector('p');     // Para mensagens de texto
        const a = card.querySelector('a');     // Para arquivos (links)
        const img = card.querySelector('img'); // Para imagens

        // Se for uma mensagem de texto (parágrafo), pega o conteúdo dela
        if (p) {
            message = p.textContent.toLowerCase();

        // Se for um arquivo (link), pega o texto do link (geralmente o nome do arquivo)
        } else if (a) {
            message = a.textContent.toLowerCase();

        // Se for uma imagem e tiver um atributo alt, usa esse valor
        } else if (img && img.alt) {
            message = img.alt.toLowerCase();
        }

        // Verifica se o conteúdo da mensagem inclui o texto digitado
        if (message.includes(filterValue)) {
            card.style.display = 'block'; // Mostra a mensagem
        } else {
            card.style.display = 'none';  // Esconde a mensagem
        }
    });
}

// ------------------------------
// FIM: Filtro das mensagens
// ------------------------------


// ------------------------------
// INÍCIO: Rolagem automática da lista de chats para o final
// ------------------------------
const chatList = document.querySelector('.chatlist');
if (chatList) {
    chatList.scrollTop = chatList.scrollHeight; // Rola até o fim da lista
}
// ------------------------------
// FIM: Rolagem automática
// ------------------------------


// ------------------------------
// INÍCIO: Envio de mensagens
// ------------------------------

// Seleciona o campo de texto onde o usuário digita a mensagem
const inputTexto = document.querySelector('#messageInput');
inputTexto.autocomplete = "off";

// Função responsável por enviar a mensagem
function sendMessage() {
    if (inputTexto.value.trim() === '') {
        return; // Não envia se estiver vazio ou apenas com espaços
    }

    const rightMessages = document.getElementById('right-messages'); // Onde as mensagens aparecem

    // Cria o elemento de lista (li) que conterá a mensagem
    const li = document.createElement('li');

    // Cria o span com o horário da mensagem
    const span = criarElementoHtml('span', 'message-data-time');
    span.textContent = new Date().toLocaleTimeString(); // Exibe o horário atual

    // Cria o parágrafo com o conteúdo da mensagem
    const p = document.createElement('p');
    p.textContent = inputTexto.value;

    // Adiciona os elementos ao li
    li.appendChild(p);
    li.appendChild(span);

    // Adiciona o li na lista de mensagens
    rightMessages.appendChild(li);

    // Rola a área de mensagens para o fim
    rightMessages.scrollTop = rightMessages.scrollHeight;

    // Limpa o input de texto após envio
    inputTexto.value = '';
}

// Adiciona evento para enviar a mensagem ao pressionar Enter
inputTexto.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        sendMessage(); // Chama a função de envio
    }
});

// Seleciona o ícone de envio (aviãozinho) e adiciona o evento de clique
const sendIcon = document.querySelector('.chatbox_input ion-icon[name="send"]');
if (sendIcon) {
    sendIcon.addEventListener('click', sendMessage);
}
// ------------------------------
// FIM: Envio de mensagens
// ------------------------------


// ------------------------------
// Função utilitária para criar elementos HTML com uma classe
// ------------------------------
function criarElementoHtml(nomeElemento, classElemento) {
    const elemento = document.createElement(nomeElemento); // Cria o elemento HTML
    elemento.classList.add(classElemento); // Adiciona a classe CSS
    return elemento;
}
// ------------------------------


// ------------------------------
// INÍCIO: Envio de arquivos (anexos)
// ------------------------------

// Seleciona o ícone de "anexar arquivo"
const attachIcon = document.querySelector('.chatbox_input ion-icon[name="attach-outline"]');

if (attachIcon) {
    attachIcon.style.cursor = 'pointer'; // Muda o cursor para indicar que é clicável

    attachIcon.addEventListener('click', () => {
        // Verifica se já existe um input de arquivo oculto
        let fileInput = document.getElementById('hiddenFileInput');
        if (!fileInput) {
            // Cria o input de arquivo escondido
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = 'hiddenFileInput';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);

            // Evento que ocorre quando um arquivo é selecionado
            fileInput.addEventListener('change', (event) => {
                const file = event.target.files[0]; // Pega o primeiro arquivo
                if (file) {
                    uploadFile(file); // Chama a função para mostrar o arquivo na conversa
                }
                fileInput.value = ''; // Limpa o valor para poder selecionar o mesmo arquivo de novo
            });
        }
        // Dispara o clique para abrir a janela de seleção de arquivos
        fileInput.click();
    });
}

// Função para exibir o arquivo enviado na conversa
function uploadFile(file) {
    console.log("Arquivo enviado:", file); // Apenas log para depuração

    const rightMessages = document.getElementById('right-messages');
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'message-data-time';
    span.textContent = new Date().toLocaleTimeString(); // Hora do envio

    // Se for imagem, exibe a imagem
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file); // Cria uma URL temporária para a imagem
        img.style.maxWidth = '200px';
        img.style.borderRadius = '10px';
        li.appendChild(img);
    } else {
        // Se for outro tipo de arquivo, cria um link para download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = file.name;
        a.textContent = `Arquivo enviado: ${file.name}`;
        a.style.color = '#0645AD';
        a.style.textDecoration = 'underline';
        li.appendChild(a);
    }

    // Adiciona a hora da mensagem e o arquivo na lista de mensagens
    li.appendChild(span);
    rightMessages.appendChild(li);
    rightMessages.scrollTop = rightMessages.scrollHeight; // Rola para o fim
}
// ------------------------------
// FIM: Envio de arquivos
// ------------------------------