const termoDoDia = "soldo";
const faseDaLua = ["fase cheia", "cheia", "lua cheia"];

const perguntas = [
    {
        pergunta: "Quando é que começamos a namorar?",
        tipo: "date",
        respostas: ["2023-02-20"]
    },
    {
        pergunta: "Onde foi o nosso primeiro encontro?",
        tipo: "text",
        respostas: ["centro da vinha", "centro comercial da vinha", "shopping da vinha", "vinha"]
    },
    {
        pergunta: "Qual é a música mais tocada do nosso spotify nos últimos 12 meses",
        tipo: "text",
        respostas: ["praga"]
    },
    {
        pergunta: "Qual é o teu apelido carinhoso favorito?",
        tipo: "text",
        respostas: ["princesa"]
    },
    {
        pergunta: "Qual foi o nosso primeiro filme juntos(cinema)?",
        tipo: "text",
        respostas: ["divertidamente 2", "divertida mente 2", "divertida-mente 2", "insideout 2", "inside out 2", "inside-out 2"]
    },
    {
        pergunta: "Resposta do <a href='https://term.ooo' target='_blank' class='termo-link'>termo</a> de hoje:",
        tipo: "text",
        respostas: [termoDoDia]
    },
    {
        pergunta: "Que fase da lua irá estar presente hoje?",
        tipo: "text",
        respostas: faseDaLua
    },
    {
        pergunta: "Que país é este?",
        tipo: "image",
        imagem: "img/maps.jpg",
        respostas: ["polonia", "polónia"]
    }
];

function carregarQuiz() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";

    perguntas.forEach((q, index) => {
        if (q.tipo === "date") {
            quizDiv.innerHTML += `
                <div class="question">
                    <p>${q.pergunta}</p>
                    <input type="date" id="resposta-${index}" />
                </div>
            `;
        } else if (q.tipo === "image") {
            quizDiv.innerHTML += `
                <div class="question">
                    <p>${q.pergunta}</p>
                    <div class="image-container">
                        <img src="${q.imagem}" alt="Imagem da pergunta" />
                    </div>
                    <input type="text" id="resposta-${index}" />
                </div>
            `;
        } else {
            quizDiv.innerHTML += `
                <div class="question">
                    <p>${q.pergunta}</p>
                    <input type="text" id="resposta-${index}" />
                </div>
            `;
        }
    });

    // Adicionar botão de submissão
    quizDiv.innerHTML += `
        <div class="submit">
            <button id="submit-button">Submeter</button>
        </div>
    `;

    // Adicionar evento de clique ao botão de submissão
    document.getElementById('submit-button').addEventListener('click', submitQuiz);
}

function submitQuiz() {
    let acertos = 0;
    let erroMaiuscula = false;

    perguntas.forEach((q, index) => {
        let respostaUsuario = document.getElementById(`resposta-${index}`).value.trim();

        // Verificar se a resposta contém letras maiúsculas
        if (respostaUsuario !== respostaUsuario.toLowerCase()) {
            erroMaiuscula = true;
        }

        if (q.tipo === "date") {
            respostaUsuario = respostaUsuario;
        } else {
            respostaUsuario = respostaUsuario.toLowerCase();
        }

        if (q.respostas.map(r => r.toLowerCase()).includes(respostaUsuario)) {
            acertos++;
        }
    });

    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        if (erroMaiuscula) {
            resultadoDiv.innerHTML = `
                <p>Por favor, mete as respostas apenas com letras minúsculas amor❤️.</p>
            `;
        } else if (acertos === perguntas.length) {
            resultadoDiv.innerHTML = `
                <p>Parabéns amor, acertaste todas as perguntas! 🎉</p>
                <p>Aqui está o código secreto para abrir o cofre: <strong>7123</strong></p>
                <button onclick="mostrarExplicacao()">Explicação do Código</button>
                <div id="explicacao" class="hidden">
                    <p>7 (sgundo digito do dia do nosso primeiro beijo: 27)</p>
                    <p>1 (do mês do nosso primeiro beijo: 12)</p>
                    <p>2 (do dia em que começamos a namorar: 20)</p>
                    <p>3 (do ano que começamos a namorar: 2023)</p>
                </div>
            `;
        } else {
            resultadoDiv.innerHTML = `
                <p>Ops! acertaste ${acertos} de ${perguntas.length} perguntas. Tenta novamente! 😢</p>
            `;
        }
    } else {
        console.error("Elemento com id 'resultado' não encontrado.");
    }
}

function mostrarExplicacao() {
    const explicacaoDiv = document.getElementById("explicacao");
    explicacaoDiv.classList.toggle('hidden');
}

// Carrega o quiz ao carregar a página
window.onload = carregarQuiz;

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('show-message-button');
    const messageContainer = document.getElementById('message-container');

    button.addEventListener('click', () => {
        messageContainer.classList.toggle('hidden');
    });
});
