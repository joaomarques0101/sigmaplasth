const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

// Adicionar ou remover a classe 'open' ao clicar no botão
menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
        navbar.classList.remove('open');
    }
});


// Fade-In e Scale-Up
gsap.from(".about-image img, .info-card", {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.3, // Animação em sequência
  });

  // Animação para Títulos e Textos
gsap.from(".header-text h1, .header-text p, .about-text h2, .about-text p", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
  });
  
  // Selecionar elementos
const chatBox = document.getElementById('chat-box');
const chatIcon = document.getElementById('chat-icon');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

/**
 * Alternar visibilidade do chat
 */
function toggleChat() {
    const isHidden = chatBox.classList.contains('hidden');

    // Alternar estados de visibilidade
    if (isHidden) {
        chatBox.classList.remove('hidden');
        chatBox.classList.add('visible');
        chatBox.setAttribute('aria-hidden', 'false');
    } else {
        chatBox.classList.add('hidden');
        chatBox.classList.remove('visible');
        chatBox.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Capturar eventos de teclado
 * @param {Event} event - Evento de teclado
 */
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        toggleChat();
    }
}

/**
 * Enviar mensagem
 */
function sendMessage() {
    const message = userInput.value.trim();

    // Evitar envio de mensagens vazias
    if (!message) return;

    // Adicionar mensagem do usuário ao chat
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Limpar o campo de entrada
    userInput.value = '';

    // Simular resposta do bot
    simulateBotResponse();
}



/**
 * Permitir envio com Enter
 * @param {Event} event - Evento de teclado
 */
function handleInputKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Função para adicionar botões de opções fornecidas pelo bot
function addBotOptions(options) {
    const chatMessages = document.getElementById('chat-messages');
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'bot-options';

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.className = 'option-button'; // Aplica o estilo dos botões de opções
        button.onclick = () => {
            addUserMessage(option.label); // Adiciona a mensagem do usuário com o texto do botão
            processUserInput(option.value); // Processa a entrada associada ao botão
        };
        optionsContainer.appendChild(button);
    });

    chatMessages.appendChild(optionsContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Enviar mensagem
 */
function sendMessage() {
    const message = userInput.value.trim();

    // Evitar envio de mensagens vazias
    if (!message) return;

    // Adicionar mensagem do usuário ao chat
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Limpar o campo de entrada
    userInput.value = '';

    // Resposta do bot com tópicos
    respondWithTopics();
}

/**
 * Exibir resposta do bot com opções de tópicos
 */
function respondWithTopics() {
    // Adicionar mensagem do bot
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.textContent = 'Tudo bem? Posso te ajudar da seguinte forma:';
    chatMessages.appendChild(botMessage);

    // Adicionar opções de tópicos
    addBotOptions([
        { label: '1 - Trabalhe Conosco', value: 'trabalhe conosco' },
        { label: '2 - Redes Sociais', value: 'redes sociais' },
        { label: '3 - Agende uma Visita', value: 'agende uma visita' },
        { label: '4 - Quem Somos?', value: 'quem somos' }
    ]);

    // Rolar para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Adicionar opções fornecidas pelo bot
 * @param {Array} options - Lista de opções com label e valor
 */
function addBotOptions(options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'bot-options';

    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.label;
        button.className = 'option-button';
        button.onclick = () => {
            addUserMessage(option.label); // Adiciona mensagem do usuário
            processUserInput(option.value); // Processa entrada do usuário
        };
        optionsContainer.appendChild(button);
    });

    chatMessages.appendChild(optionsContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Adicionar mensagem do usuário ao chat
 * @param {string} message - Mensagem do usuário
 */
function addUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
}

/**
 * Processar entrada do usuário
 * @param {string} input - Entrada selecionada pelo usuário
 */
function processUserInput(input) {
    switch (input.toLowerCase()) {
        case 'trabalhe conosco':
            addBotMessage(
                'Para saber mais sobre vagas, visite nossa página: ' +
                '<a href="trabalhe-conosco.html" target="_blank" class="bot-link">Trabalhe Conosco</a>.'
            );
            break;
        case 'redes sociais':
            addBotMessage(
                'Siga-nos nas redes sociais: ' +
                '<a href="https://instagram.com" target="_blank" class="bot-link">Instagram</a>, ' +
                '<a href="https://facebook.com" target="_blank" class="bot-link">Facebook</a>, e ' +
                '<a href="https://twitter.com" target="_blank" class="bot-link">Twitter</a>.'
            );
            break;
        case 'agende uma visita':
            addBotMessage(
                'Para agendar uma visita, entre em contato pelo nosso WhatsApp: ' +
                '<a href="https://wa.me/55123456789" target="_blank" class="bot-link">+55 12345-6789</a>.'
            );
            break;
        case 'quem somos':
            addBotMessage(
                'Somos uma empresa dedicada a oferecer as melhores experiências para você! Saiba mais em nossa ' +
                '<a href="sobre.html" target="_blank" class="bot-link">página Sobre Nós</a>.'
            );
            break;
        default:
            addBotMessage('Desculpe, não entendi. Pode reformular ou escolher uma das opções acima?');
            break;
    }
}

/**
 * Adicionar mensagem do bot ao chat
 * @param {string} message - Mensagem do bot (pode incluir HTML)
 */
function addBotMessage(message) {
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.innerHTML = message; // Permitir HTML nas mensagens do bot
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function addBotMessage(message) {
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.textContent = message;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
