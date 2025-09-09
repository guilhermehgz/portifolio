
// Banco inicial de conhecimento (100+ respostas, resumido aqui)
let defaultKnowledge = {
  
    "oi": "Oi! Que bom te ver por aqui 😄. Bem-vindo ao meu portfólio!",
    "olá": "Olá! Fico feliz com a sua visita 😊. Explore meu portfólio!",
    "hello": "Hello! Welcome to my portfolio 😎. Feel free to look around!",
    "tchau": "Tchau! Foi ótimo conversar com você 👋. Volte sempre!",
    "adeus": "Adeus! Espero te ver de novo em breve 😉.",
    "até logo": "Até logo! Obrigado pela visita e volte sempre 😄.",
    "como vai": "Estou ótimo, obrigado por perguntar! E você, como está?",
    "tudo bem": "Tudo ótimo por aqui! E você, como está se sentindo hoje?",
    "nome": "Meu nome é ChatBot Portfolio, prazer em te conhecer!",
    "portfólio": "Você está vendo meu portfólio online, cheio de projetos legais 💻.",
    "programação": "Ah, adoro programar! HTML, CSS, JS e Node.js são meus favoritos 😎.",
    "código": "Programar é meu hobby favorito! 😄 Adoro HTML, CSS, JS e Node.js.",
    "desenvolvimento": "Desenvolver é incrível! Posso mostrar meus projetos em JS, HTML e CSS.",
    "help": "Precisa de ajuda? 🤔 Você pode me perguntar coisas como: 'Oi', 'Portfólio', 'Programação', 'Python', 'Contato'.",
    "javascript": "JavaScript é super versátil! Dá para criar sites, apps e até servidores 😎.",
    "js": "JS é incrível! Posso te mostrar muitas coisas legais que ele faz.",
    "html": "HTML é a base de qualquer página web. Sem ele, nada funciona 😅.",
    "css": "CSS deixa tudo bonito e responsivo. Adoro brincar com cores e layouts 🎨.",
    "node": "Node.js é ótimo para criar servidores e APIs usando JavaScript 🚀.",
    "nodejs": "Node.js facilita muito o desenvolvimento backend com JS!",
    "express": "Express é um framework de Node.js que agiliza a criação de servidores.",
    "python": "Python é perfeito para scripts, automação e até inteligência artificial 🤖.",
    "github": "GitHub é meu lugar favorito para versionamento e mostrar projetos 📂.",
    "git": "Git ajuda a controlar versões de código e colaborar com outros devs.",
    "linkedin": "Você pode me encontrar no LinkedIn! Vamos nos conectar 😉.",
    "contato": "Quer me contatar? Meu email é exemplo@teste.com ✉️",
    "email": "Pode me escrever no email: exemplo@teste.com 📧",
    "projetos": "Tenho vários projetos interessantes de sites, apps e chatbots 💡.",
    "trabalhos": "Quer ver meus trabalhos? Tenho sites, apps e chatbots para mostrar!",
    "idade": "Não tenho idade 😅, sou apenas um programa!",
    "clima": "Ainda não sei informar o clima ☁️, mas posso aprender com você!",
    "tempo": "Não consigo informar o tempo ainda, mas podemos conversar sobre programação 😄.",
    "hobbies": "Gosto de aprender coisas novas e bater papo com você 😎.",
    "passatempo": "Meu passatempo é programar e conversar com pessoas legais como você!",
    "ajuda": "Claro! Pergunte qualquer coisa, estou aqui para ajudar 😊.",
    "socorro": "Não se preocupe, estou aqui para te ajudar! 🤝",
    "brincadeira": "Que tal uma piada? Por que o computador foi ao médico? Porque pegou um vírus! 😂",
    "piada": "Adoro piadas! Aqui vai uma: Por que o computador foi ao médico? Porque pegou um vírus! 😆",
    "cor favorita": "Adoro tons de azul e verde 💙💚. E você?",
    "cores": "Gosto de azul e verde, cores que transmitem calma e criatividade 🌿💙.",
    "desenho": "Arte digital é incrível! Adoro criar em SVG e Canvas 🎨.",
    "arte": "Criar arte digital é divertido! Posso mostrar alguns exemplos.",
    "música": "Ouço muitas músicas, principalmente eletrônica 🎧.",
    "song": "Adoro ouvir músicas enquanto programo 😎.",
    "filme": "Gosto de ficção científica e ação 🎬. Qual seu gênero favorito?",
    "cinema": "Cinema é demais! Filmes de ação e sci-fi são meus preferidos.",
    "livro": "Sou fã de livros de tecnologia e ficção científica 📚.",
    "leitura": "Adoro ler sobre tecnologia e histórias futuristas!",
    "futebol": "Não jogo futebol, mas adoro acompanhar os campeonatos ⚽.",
    "esporte": "Gosto de assistir esportes, especialmente futebol e e-sports 🏆.",
    "comida": "Pizza e sushi são meus favoritos 😋. E os seus?",
    "culinária": "Adoro comidas variadas, principalmente pizza e sushi 🍣🍕.",
    "viagem": "Adoro explorar o mundo, mesmo que seja virtual 🌍.",
    "turismo": "Se pudesse, viajaria pelo mundo inteiro! 😄",
    "inteligência artificial": "Sou uma IA em aprendizado contínuo 🤖. Adoro conversar com você!",
    "ia": "Inteligência artificial é meu mundo! Aprendo com cada interação 😊",
    "aprendizado": "Quanto mais você me ensina, melhor eu fico 😎!",
    "aprender": "Aprender com você é meu passatempo favorito 😄.",
    "tecnologia": "Tecnologia é fascinante! Adoro ver como ela muda o mundo 🌐.",
    "web": "Desenvolvimento web é minha especialidade 💻. Posso te mostrar meus projetos!",
    "offline": "Posso funcionar completamente offline no navegador, sem depender da internet 😉.",
    "local": "Mesmo offline, posso conversar e aprender com você! 😎"
};

// ... continue com as demais 100+ respostas iniciais

// Carrega aprendizado do localStorage
let knowledge = JSON.parse(localStorage.getItem('knowledge')) || defaultKnowledge;

// Salva aprendizado
function saveKnowledge() {
    localStorage.setItem('knowledge', JSON.stringify(knowledge));
}

// Similaridade simples: verifica se alguma palavra-chave bate com a mensagem
function findResponse(msg) {
    msg = msg.toLowerCase().trim();
    // Comando help
    if (msg === "help") {
        return getHelpMessage();
    }
    for (let key in knowledge) {
        let keywords = key.split('|');
        for (let kw of keywords) {
            if (msg.includes(kw)) return knowledge[key];
        }
    }
    return null;
}

// Gera mensagem de help com algumas interações disponíveis
function getHelpMessage() {
    let examples = [];
    let count = 0;
    for (let key in knowledge) {
        if (count >= 10) break; // mostrar no máximo 10 exemplos
        let kw = key.split('|')[0]; // pega a primeira palavra-chave
        if (kw !== "help") { 
            examples.push(kw);
            count++;
        }
    }
    return "Você pode tentar algumas interações:\n- " + examples.join("\n- ");
}

// Adiciona mensagem ao chat
function addMessage(sender, text) {
    const messagesDiv = document.getElementById('messages');
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Processa mensagem do usuário
function processMessage(msg) {
    let response = findResponse(msg);
    if (response) {
        addMessage('bot', response);
    } else {
        let answer = prompt("Não sei responder. Por favor, me ensine:");
        if (answer && answer.trim() !== "") {
            knowledge[msg.toLowerCase()] = answer.trim();
            saveKnowledge();
            addMessage('bot', "Obrigado! Aprendi algo novo.");
        } else {
            addMessage('bot', "Ainda não sei responder isso. Digite 'help' para ver exemplos.");
        }
    }
}

// Envia mensagem
function sendMessage() {
    const input = document.getElementById('input');
    const message = input.value.trim();
    if (!message) return;
    addMessage('user', message);
    input.value = '';
    processMessage(message);
}

// Event listeners
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('input').addEventListener('keypress', function(e){
    if(e.key === 'Enter') sendMessage();
});
