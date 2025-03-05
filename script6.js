// Selecionar elementos do DOM
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Verificar se os elementos essenciais foram encontrados
if (!menuToggle || !navbar || !chatBox || !chatMessages || !userInput) {
    console.error('Um ou mais elementos do DOM não foram encontrados.');
}

// Estado do chat
let isChatVisible = false;

/**
 * Alternar a exibição do menu de navegação ao clicar no botão
 */
if (menuToggle && navbar) {
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
}

/**
 * Alternar a visibilidade do chat
 */
function toggleChat() {
    if (!chatBox) return;
    isChatVisible = !isChatVisible;
    chatBox.classList.toggle('hidden', !isChatVisible);
    chatBox.classList.toggle('visible', isChatVisible);
    chatBox.setAttribute('aria-hidden', !isChatVisible);
}

/**
 * Enviar mensagem ao pressionar Enter
 */
if (userInput) {
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
}

/**
 * Enviar a mensagem do usuário e gerar resposta do bot
 */
function sendMessage() {
    if (!userInput || !chatMessages) return;
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
 * Criar elemento de mensagem
 * @param {string} type - Tipo da mensagem ('user', 'bot', etc.)
 * @param {string} content - Conteúdo da mensagem
 * @returns {HTMLElement} Elemento de mensagem criado
 */
function createMessage(type, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = content;
    return messageElement;
}

/**
 * Adicionar mensagem ao chat
 * @param {string} type - Tipo da mensagem ('user', 'bot', etc.)
 * @param {string} content - Conteúdo da mensagem
 */
function addMessage(type, content) {
    if (!chatMessages) return;
    const messageElement = createMessage(type, content);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
}

/**
 * Mostrar indicador de "digitando..."
 */
function showTypingIndicator() {
    if (!chatMessages) return;
    const typingIndicator = createMessage('bot', '...');
    typingIndicator.classList.add('typing');
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
    if (!chatMessages) return;
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
 * Definir um cookie
 * @param {string} name - Nome do cookie
 * @param {string} value - Valor do cookie
 * @param {number} days - Dias até a expiração
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

/**
 * Obter o valor de um cookie
 * @param {string} name - Nome do cookie
 * @returns {string} Valor do cookie ou vazio se não encontrado
 */
function getCookie(name) {
    const nameEq = `${name}=`;
    return document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(nameEq))?.substring(nameEq.length) || '';
}

/**
 * Configurar banner de cookies
 */
const cookieBanner = document.getElementById('cookie-banner');
if (cookieBanner && !getCookie('cookies_accepted') && !getCookie('cookies_denied')) {
    cookieBanner.style.display = 'block';
}

const acceptCookieButton = document.getElementById('accept-cookie');
if (acceptCookieButton) {
    acceptCookieButton.onclick = () => {
        setCookie('cookies_accepted', 'true', 365);
        if (cookieBanner) cookieBanner.style.display = 'none';
    };
}

const denyCookieButton = document.getElementById('deny-cookie');
if (denyCookieButton) {
    denyCookieButton.onclick = () => {
        setCookie('cookies_denied', 'true', 365);
        if (cookieBanner) cookieBanner.style.display = 'none';
    };
}

/**
 * Sistema de Busca
 */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        doSearch();
    }
}

function doSearch() {
    const searchInput = document.getElementById('transparent-search-input');
    if (!searchInput) return;
    const searchQuery = searchInput.value.trim().toLowerCase();
    const keywords = {
        pagina1: ['sobre', 'história', 'informações', 'empresa', 'quem somos', 'institucional', 'quem somos nós', 'nossa missão', 
            'nossa história', 'sobre nós', 'empresa', 'fundação', 'fundada', 'corporativo', 'início', 'empresa líder'],
        pagina2: ['contato', 'fale conosco', 'suporte', 'atendimento', 'email', 'telefone', 'falar', 'conversar', 'fale com', 
            'enviar mensagem', 'chat', 'central de atendimento', 'fale', 'suporte ao cliente', 'dúvidas', 'fale já'],
        pagina3: ['produtos', 'mercado', 'oferta', 'catalogo', 'itens', 'produtos e serviços', 'loja', 'catalogo de produtos', 
            'produtos disponíveis', 'categorias', 'venda', 'ofertas', 'mercadoria', 'linha de produtos', 'produtos em estoque', 
            'comprar', 'compras', 'loja online', 'acessórios'],
        pagina4: ['apoiamos', 'parcerias', 'ajuda', 'colaboração', 'apoio', 'suporte', 'parceiros', 'alianças', 'parceria', 
            'ajudar', 'colaborar', 'suporte ao cliente', 'projetos sociais', 'desenvolvimento', 'acompanhamento', 'ajudar você'],
        pagina5: ['faça parte', 'seja nosso parceiro', 'junte-se a nós', 'trabalhe conosco', 'carreiras', 'oportunidades', 
            'venha fazer parte', 'Trabalhar', 'junte-se', 'candidatura', 'vaga de emprego', 'oportunidade de emprego', 
            'trabalhe', 'seja um de nós', 'divulgue sua candidatura', 'join us']
    };
    if (searchQuery) {
        for (let page in keywords) {
            if (keywords[page].some(keyword => searchQuery.includes(keyword))) {
                window.location.href = `${page}.html`;
                return;
            }
        }
        alert('Desculpe, não encontramos resultados exatos.');
    }
}

/**
 * Animações com GSAP
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP ou ScrollTrigger não estão carregados.');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -100,
        duration: 1
    });
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 100,
        duration: 1
    });
    gsap.from('.header-text', {
        scrollTrigger: {
            trigger: '.header-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: -50,
        duration: 1
    });
});
