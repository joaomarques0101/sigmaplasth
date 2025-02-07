// Selecionar elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

/**
 * Alternar a exibição do menu de navegação ao clicar no botão
 */
menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

/**
 * Fechar o menu ao clicar fora dele
 */
document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
        navbar.classList.remove('open');
    }
});

/**
 * Alternar a visibilidade do chat
 */
function toggleChat() {
    const isHidden = chatBox.classList.contains('hidden');

    chatBox.classList.toggle('hidden', !isHidden);
    chatBox.classList.toggle('visible', isHidden);
    chatBox.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
}

/**
 * Enviar mensagem ao pressionar Enter
 */
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

/**
 * Enviar a mensagem do usuário e gerar resposta do bot
 */
function sendMessage() {
    const message = userInput.value.trim();

    if (!message) return;

    addMessage('user', message);
    userInput.value = '';

    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        addMessage('bot', 'Posso estar te ajudando da seguinte forma abaixo.');
        showActionButtons();
    }, Math.random() * 1000 + 1000); // Entre 1 e 2 segundos
}

/**
 * Adicionar mensagem ao chat
 */
function addMessage(type, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

/**
 * Mostrar indicador de "digitando..."
 */
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot', 'typing');
    typingIndicator.textContent = '...';
    typingIndicator.id = 'typing-indicator';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

/**
 * Remover indicador de "digitando..."
 */
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
}

/**
 * Mostrar botões de ação com links diretos
 */
function showActionButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('bot-options');

    const buttons = [
        { label: 'Trabalhe Conosco', link: 'pagina5.html' },
        { label: 'Redes Sociais', link: 'pagina7.html', target: '_blank' },
        { label: 'Agende uma Visita', link: 'pagina6.html', target: '_blank' },
        { label: 'Quem Somos', link: 'pagina1.html' }
    ];

    buttons.forEach(buttonData => {
        const button = document.createElement('a');
        button.textContent = buttonData.label;
        button.href = buttonData.link;
        button.className = 'option-button';
        if (buttonData.target) button.target = buttonData.target;
        buttonsContainer.appendChild(button);
    });

    chatMessages.appendChild(buttonsContainer);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

/**
 * Gerenciamento de Cookies
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEq = `${name}=`;
    return document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(nameEq))?.substring(nameEq.length) || '';
}

if (!getCookie("cookies_accepted") && !getCookie("cookies_denied")) {
    document.getElementById("cookie-banner").style.display = "block";
}

document.getElementById("accept-cookie").onclick = () => {
    setCookie("cookies_accepted", "true", 365);
    document.getElementById("cookie-banner").style.display = "none";
};

document.getElementById("deny-cookie").onclick = () => {
    setCookie("cookies_denied", "true", 365);
    document.getElementById("cookie-banner").style.display = "none";
};

/**
 * Sistema de Busca
 */
function handleKeyPress(event) {
    if (event.key === "Enter") {
        doSearch();
    }
}

function doSearch() {
    const searchQuery = document.getElementById('transparent-search-input').value.trim().toLowerCase();
    const keywords = {
        pagina1: ["sobre", "história", "informações", "empresa", "quem somos", "institucional", "quem somos nós", "nossa missão", 
            "nossa história", "sobre nós", "empresa", "fundação", "fundada", "corporativo", "início", "empresa líder"],
        pagina2: ["contato", "fale conosco", "suporte", "atendimento", "email", "telefone", "falar", "conversar", "fale com", 
            "enviar mensagem", "chat", "central de atendimento", "fale", "suporte ao cliente", "dúvidas", "fale já"],
        pagina3: ["produtos", "mercado", "oferta", "catalogo", "itens", "produtos e serviços", "loja", "catalogo de produtos", 
            "produtos disponíveis", "categorias", "venda", "ofertas", "mercadoria", "linha de produtos", "produtos em estoque", 
            "comprar", "compras", "loja online", "acessórios"],
        pagina4: ["apoiamos", "parcerias", "ajuda", "colaboração", "apoio", "suporte", "parceiros", "alianças", "parceria", 
            "ajudar", "colaborar", "suporte ao cliente", "projetos sociais", "desenvolvimento", "acompanhamento", "ajudar você"],
        pagina5: ["faça parte", "seja nosso parceiro", "junte-se a nós", "trabalhe conosco", "carreiras", "oportunidades", 
            "venha fazer parte", "Trabalhar", "junte-se", "candidatura", "vaga de emprego", "oportunidade de emprego", 
            "trabalhe", "seja um de nós", "divulgue sua candidatura", "join us"]
    };

    if (searchQuery) {
        for (let page in keywords) {
            if (keywords[page].some(keyword => searchQuery.includes(keyword))) {
                window.location.href = `${page}.html`;
                return;
            }
        }
        alert("Desculpe, não encontramos resultados exatos.");
    }
}
