document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("cadastrar-quiz");
    const container = document.getElementById("lista-quizzes");
    const containerAlt = document.getElementById("alternativas");

    let questoes = [];

    // formatador de nomes para exibicao
    const formatador = {
        matematica: "Matemática",
        portugues: "Português",
        historia: "História",
        fisica: "Física",
        quimica: "Química",
        sociologia: "Sociologia",
        ingles: "Inglês",
        biologia: "Biologia",
        facil: "Fácil",
        medio: "Médio",
        dificil: "Difícil"
    };

    function adicionarAlternativa() {
        const totalAlts = containerAlt.children.length;

        // limite maximo de 5 alternativas
        if (totalAlts >= 5) {
            alert("Máximo de 5 alternativas permitido!");
            return;
        }

        const div = document.createElement("div");
        div.classList.add("alt-item");
        
        // estrutura com botao de remover
        div.innerHTML = `
            <input type="radio" name="correta" value="${totalAlts}">
            <input type="text" class="alt-texto" style="flex: 1;">
            <button type="button" class="btn-remover-alt" style="color: red; background: none; border: none; cursor: pointer; font-weight: bold; margin-left: 10px;">X</button>
        `;

        // evento para remover alternativa
        div.querySelector(".btn-remover-alt").addEventListener("click", () => {
            if (containerAlt.children.length > 2) {
                div.remove();
                atualizarIndicesAlternativas();
            } else {
                alert("O quiz precisa de pelo menos 2 alternativas!");
            }
        });

        containerAlt.appendChild(div);
        atualizarIndicesAlternativas();
    }

    // atualiza placeholders e valores dos radios
    function atualizarIndicesAlternativas() {
        const itens = containerAlt.querySelectorAll(".alt-item");
        itens.forEach((item, index) => {
            const letra = String.fromCharCode(65 + index);
            item.querySelector(".alt-texto").placeholder = `alternativa ${letra}`;
            item.querySelector('input[name="correta"]').value = index;
        });
    }

    window.adicionarAlternativa = adicionarAlternativa;

    function adicionarQuestao() {
        let pergunta = document.getElementById("enunciado_pergunta").value;
        let materia = document.getElementById("materia")?.value;
        let dificuldade = document.getElementById("dificuldade")?.value;

        const imagemInput = document.getElementById("foto_pergunta");
        const arquivo = imagemInput.files[0];

        const alternativasHTML = document.querySelectorAll(".alt-item");
        let alternativas = [];

        alternativasHTML.forEach(item => {
            const texto = item.querySelector(".alt-texto").value;
            if (texto.trim()) alternativas.push(texto);
        });

        const corretaSelecionada = document.querySelector('input[name="correta"]:checked');

        // validacoes de campos obrigatorios
        if (!pergunta.trim()) {
            alert("Digite o enunciado da pergunta!");
            return;
        }
        if (alternativas.length < 2) {
            alert("Preencha pelo menos 2 alternativas!");
            return;
        }
        if (!corretaSelecionada) {
            alert("Selecione qual alternativa é a correta!");
            return;
        }

        const salvarQuestao = (imgBase64 = null) => {
            questoes.push({
                id: Date.now(),
                pergunta,
                materia,
                dificuldade,
                imagem: imgBase64,
                alternativas,
                correta: parseInt(corretaSelecionada.value)
            });

            renderizarQuestoes();

            // limpa campos da questao
            document.getElementById("enunciado_pergunta").value = "";
            document.getElementById("foto_pergunta").value = "";
            containerAlt.innerHTML = "";
            adicionarAlternativa();
            adicionarAlternativa();
        };

        if (arquivo) {
            const reader = new FileReader();
            reader.onload = (e) => salvarQuestao(e.target.result);
            reader.readAsDataURL(arquivo);
        } else {
            salvarQuestao(null);
        }
    }

    window.adicionarQuestao = adicionarQuestao;

    // limpa tudo e recarrega
    window.descartarQuiz = () => {
        if (confirm("Realmente deseja descartar o quiz?")) {
            alert("Quiz descartado.");
            window.location.reload();
        }
    };

    function renderizarQuestoes() {
        container.innerHTML = "";
        questoes.forEach(q => {
            const div = document.createElement("div");
            div.classList.add("card-quizzes");
            div.innerHTML = `
                <h3>${q.pergunta}</h3>
                <p><strong>Matéria:</strong> ${formatador[q.materia] || q.materia} | <strong>Dificuldade:</strong> ${formatador[q.dificuldade] || q.dificuldade}</p>
            `;
            container.appendChild(div);
        });
    }

    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();
            if (questoes.length === 0) {
                alert("Adicione pelo menos uma pergunta!");
                return;
            }
            let quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
            quizzes.push({
                id: Date.now(),
                titulo: document.getElementById("titulo_quiz").value || "Sem título",
                questoes
            });
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
            alert("Quiz criado com sucesso!");
            window.location.href = "../base/perfil.html";
        });
    }

    // inicializa com 2 alternativas
    adicionarAlternativa();
    adicionarAlternativa();
});