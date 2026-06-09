// Gerencia a realização e avaliação de quizzes
document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const resultadosContainer = document.getElementById("resultados-container");
    
    if (!quizContainer) return;

    // Pega o ID do quiz da URL
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = parseInt(urlParams.get("id"));

    if (!quizId) {
        quizContainer.innerHTML = "<p style='text-align: center; color: red;'>Erro: Quiz não encontrado</p>";
        return;
    }

    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const quiz = quizzes.find(q => q.id === quizId);

    if (!quiz) {
        quizContainer.innerHTML = "<p style='text-align: center; color: red;'>Erro: Quiz não encontrado</p>";
        return;
    }

    // Verifica se o quiz foi criado por um usuário (não é template)
    if (quiz.creatorType === "template") {
        quizContainer.innerHTML = "<p style='text-align: center; color: red;'>Este quiz não está disponível para realização. Apenas quizzes criados por usuários podem ser realizados.</p>";
        return;
    }

    // Respostas do usuário
    let respostasUsuario = {};

    // Renderiza o cabeçalho do quiz
    function renderizarCabecalho() {
        const cabecalho = document.querySelector(".cabecalho-quiz");
        if (cabecalho) {
            document.querySelector("#v-nome").textContent = quiz.titulo || "Quiz sem título";
        }
    }

    // Renderiza as questões
    function renderizarQuestoes() {
        if (!quiz.questoes || quiz.questoes.length === 0) {
            quizContainer.innerHTML = "<p style='text-align: center; color: red;'>Este quiz não possui questões</p>";
            return;
        }

        let html = '<div class="questoes-container">';
        
        quiz.questoes.forEach((questao, index) => {
            const numeroQuestao = index + 1;
            html += `
                <div class="questao-card" data-questao-index="${index}">
                    <div class="questao-numero">
                        <span>Questão ${numeroQuestao} de ${quiz.questoes.length}</span>
                    </div>
                    
                    ${questao.imagem ? `<img src="${questao.imagem}" alt="Imagem da questão" class="questao-imagem">` : ''}
                    
                    <h3 class="questao-enunciado">${questao.pergunta}</h3>
                    
                    <div class="alternativas-container">
            `;

            questao.alternativas.forEach((alternativa, altIndex) => {
                const letra = String.fromCharCode(65 + altIndex);
                const inputId = `q${index}-alt${altIndex}`;
                const isSelected = respostasUsuario[index] === altIndex;
                
                html += `
                    <label class="alternativa-label">
                        <input 
                            type="radio" 
                            name="questao-${index}" 
                            value="${altIndex}" 
                            id="${inputId}"
                            ${isSelected ? 'checked' : ''}
                            onchange="selecionarResposta(${index}, ${altIndex})"
                        >
                        <span class="alternativa-texto">
                            <strong>${letra})</strong> ${alternativa}
                        </span>
                    </label>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += '</div>';
        quizContainer.innerHTML = html;

        // Restaura respostas salvas
        Object.keys(respostasUsuario).forEach(index => {
            const inputElement = document.getElementById(`q${index}-alt${respostasUsuario[index]}`);
            if (inputElement) {
                inputElement.checked = true;
            }
        });
    }

    // Seleciona uma resposta
    window.selecionarResposta = (questaoIndex, alternativaIndex) => {
        respostasUsuario[questaoIndex] = alternativaIndex;
    };

    // Finaliza o quiz e mostra resultados
    window.finalizarQuiz = () => {
        if (Object.keys(respostasUsuario).length !== quiz.questoes.length) {
            alert("Por favor, responda todas as questões antes de finalizar!");
            return;
        }

        // Calcula resultados
        let acertos = 0;
        const resultadosDetalhados = [];

        quiz.questoes.forEach((questao, index) => {
            const respostaUsuario = respostasUsuario[index];
            const estaCorreta = respostaUsuario === questao.correta;
            
            if (estaCorreta) {
                acertos++;
            }

            resultadosDetalhados.push({
                numero: index + 1,
                pergunta: questao.pergunta,
                imagem: questao.imagem,
                alternativas: questao.alternativas,
                respostaUsuario: respostaUsuario,
                respostaCorreta: questao.correta,
                estaCorreta: estaCorreta
            });
        });

        const percentualAcerto = Math.round((acertos / quiz.questoes.length) * 100);

        mostrarResultados(acertos, quiz.questoes.length, percentualAcerto, resultadosDetalhados);
    };

    // Mostra os resultados
    function mostrarResultados(acertos, total, percentual, detalhes) {
        quizContainer.style.display = "none";
        document.querySelector(".botoes-quiz").style.display = "none";

        let html = `
            <div class="tela-resultados">
                <div class="resumo-resultados">
                    <h2>Resultados do Quiz</h2>
                    
                    <div class="placar">
                        <div class="score-box">
                            <div class="score-number">${acertos}/${total}</div>
                            <div class="score-label">Acertos</div>
                        </div>
                        
                        <div class="percentual-box">
                            <div class="percentual-circle" style="--percentual: ${percentual}%">
                                <span class="percentual-text">${percentual}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="mensagem-resultado">
                        ${percentual === 100 ? '<p style="color: #2ecc71; font-weight: bold; font-size: 1.2em;">Parabéns Você acertou todas</p>' : ''}
                        ${percentual >= 80 && percentual < 100 ? '<p style="color: #3498db; font-weight: bold; font-size: 1.2em;">Excelente desempenho</p>' : ''}
                        ${percentual >= 60 && percentual < 80 ? '<p style="color: #f39c12; font-weight: bold; font-size: 1.2em;">Bom desempenho</p>' : ''}
                        ${percentual < 60 ? '<p style="color: #e74c3c; font-weight: bold; font-size: 1.2em;">Boa tentativa</p>' : ''}
                    </div>
                </div>

                <div class="detalhes-resultados">
                    <h3>Detalhes das Questões</h3>
        `;

        detalhes.forEach(detalhe => {
            const classe = detalhe.estaCorreta ? "correta" : "incorreta";
            const icon = detalhe.estaCorreta ? "✓" : "✗";
            const respostaSelecionada = detalhe.alternativas[detalhe.respostaUsuario];
            const respostaCorreta = detalhe.alternativas[detalhe.respostaCorreta];
            const letraCorreta = String.fromCharCode(65 + detalhe.respostaCorreta);
            const letraSelecionada = String.fromCharCode(65 + detalhe.respostaUsuario);

            html += `
                <div class="resultado-questao ${classe}">
                    <div class="resultado-header">

                        <span class="resultado-numero">Questão ${detalhe.numero}</span>
                        <span class="resultado-status">${detalhe.estaCorreta ? 'Correto' : 'Incorreto'}</span>
                    </div>

                    ${detalhe.imagem ? `<img src="${detalhe.imagem}" alt="Questão ${detalhe.numero}" class="resultado-imagem">` : ''}

                    <p class="resultado-pergunta">${detalhe.pergunta}</p>

                    <div class="resultado-respostas">
                        <div class="resposta-usuario">
                            <strong>Sua resposta (${letraSelecionada}):</strong>
                            <p>${respostaSelecionada}</p>
                        </div>

                        ${!detalhe.estaCorreta ? `
                            <div class="resposta-correta">
                                <strong>Resposta correta (${letraCorreta}):</strong>
                                <p>${respostaCorreta}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                </div>

                <div class="botoes-resultados">
                    <button onclick="window.location.href='javascript:history.back()'" class="btn-voltar-resultado">← Voltar</button>
                    <button onclick="location.reload()" class="btn-refazer">Refazer Quiz</button>
                </div>
            </div>
        `;

        resultadosContainer.innerHTML = html;
        resultadosContainer.style.display = "block";
    };

    // Inicializa
    renderizarCabecalho();
    renderizarQuestoes();
});
