document.addEventListener("DOMContentLoaded", () => {
    // puxa os elementos da tela, os parametros e o usuario logado
    const formEdicao = document.getElementById("editar-quiz");
    const container = document.getElementById("lista-quizzes");
    const containerAlt = document.getElementById("alternativas");
    const params = new URLSearchParams(window.location.search);
    const idEdicao = params.get("id");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // busca o quiz no banco
    let quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    let quizOriginal = quizzes.find(q => q.id == idEdicao);

    // barra se o quiz n existir
    if (!quizOriginal) {
        alert("Quiz não encontrado!");
        window.location.href = "../base/categorias.html";
        return;
    }

    // barra quem n é dono do quiz
    if (!usuarioLogado || (quizOriginal.creatorEmail !== usuarioLogado.email && quizOriginal.creator !== usuarioLogado.nome)) {
        alert("Você não tem permissão para editar este quiz.");
        window.location.href = "../base/categorias.html";
        return;
    }

    let questoes = [...quizOriginal.questoes];
    document.getElementById("titulo_quiz").value = quizOriginal.titulo;

    // pega a categoria e dificuldade da primeira questao pra preencher os selects
    if (questoes.length > 0) {
        const primeiraQuestao = questoes[0];
        if (primeiraQuestao.materia) document.getElementById("materia").value = primeiraQuestao.materia;
        if (primeiraQuestao.dificuldade) document.getElementById("dificuldade").value = primeiraQuestao.dificuldade;
    }

    // dicionario pra deixar os textos com letra maiuscula na tela
    const formatador = {
        matematica: "Matemática",
        portugues: "Português",
        historia: "História",
        fisica: "Física",
        quimica: "Química",
        sociologia: "Sociologia",
        ingles: "Inglês",
        biologia: "Biologia",
        geografia: "Geografia",
        facil: "Fácil",
        medio: "Médio",
        dificil: "Difícil"
    };

    // cria um novo campo pra digitar alternativa
    function adicionarAlternativa() {
        const totalAlts = containerAlt.children.length;

        if (totalAlts >= 5) {
            alert("Máximo de 5 alternativas permitido!");
            return;
        }

        const div = document.createElement("div");
        div.classList.add("alt-item");
        
        div.innerHTML = `
            <input type="radio" name="correta" value="${totalAlts}">
            <input type="text" class="alt-texto" style="flex: 1;">
            <button type="button" class="btn-remover-alt" style="color: red; background: none; border: none; cursor: pointer; font-weight: bold; margin-left: 10px;">X</button>
        `;

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

    // arruma as letras dos placeholders e os valores dos radios pra n bugar
    function atualizarIndicesAlternativas() {
        const itens = containerAlt.querySelectorAll(".alt-item");
        itens.forEach((item, index) => {
            const letra = String.fromCharCode(65 + index);
            item.querySelector(".alt-texto").placeholder = `alternativa ${letra}`;
            item.querySelector('input[name="correta"]').value = index;
        });
    }

    window.adicionarAlternativa = adicionarAlternativa;

    // pega oq foi preenchido e joga na lista de questoes do quiz
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

    // deleta uma pergunta especifica da lista
    window.removerQuestao = (idQuestao) => {
        questoes = questoes.filter(q => q.id !== idQuestao);
        renderizarQuestoes();
    };

    // desiste de editar e volta pro perfil
    window.descartarQuiz = () => {
        if (confirm("Realmente deseja cancelar a edição?")) {
            localStorage.removeItem("quizEmEdicao");
            window.location.href = "../base/perfil.html";
        }
    };

    // desenha os cards das perguntas na tela
    function renderizarQuestoes() {
        container.innerHTML = "";
        questoes.forEach(q => {
            const div = document.createElement("div");
            div.classList.add("card-quizzes");
            div.innerHTML = `
                <h3>${q.pergunta}</h3>
                <div style="padding: 0 15px 15px 15px; text-align: center; color: #475d5b; font-size: 0.85rem;">
                    <strong>Matéria:</strong> ${formatador[q.materia] || q.materia} | <strong>Dificuldade:</strong> ${formatador[q.dificuldade] || q.dificuldade}
                </div>
                <button type="button" onclick="removerQuestao(${q.id})" style="margin: 10px auto; display: block; background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Remover Pergunta</button>
            `;
            container.appendChild(div);
        });
    }

    // aplica as mudancas no banco quando o formulario é enviado
    if (formEdicao) {
        formEdicao.addEventListener("submit", (e) => {
            e.preventDefault();
            if (questoes.length === 0) {
                alert("O quiz precisa ter pelo menos uma pergunta!");
                return;
            }
            
            const index = quizzes.findIndex(q => q.id == idEdicao);
            
            if (index !== -1) {
                // pega o input da foto do quiz
                const imagemQuizInput = document.getElementById("foto_quiz");
                const arquivoQuiz = imagemQuizInput ? imagemQuizInput.files[0] : null;

                // logica de atualizar
                const finalizarEdicao = (imgQuizBase64) => {
                    const materiaSelecionada = document.getElementById("materia").value;
                    const dificuldadeSelecionada = document.getElementById("dificuldade").value;

                    questoes = questoes.map(q => ({
                        ...q,
                        materia: materiaSelecionada,
                        dificuldade: dificuldadeSelecionada
                    }));

                    quizzes[index].titulo = document.getElementById("titulo_quiz").value || "Sem título";
                    quizzes[index].imagem = imgQuizBase64; // atualiza a imagem
                    quizzes[index].questoes = questoes;
                    
                    localStorage.setItem("quizzes", JSON.stringify(quizzes));
                    localStorage.removeItem("quizEmEdicao");
                    
                    alert("Quiz atualizado com sucesso!");
                    window.location.href = "../base/perfil.html";
                };

                // le a foto nova ou mantem a velha
                if (arquivoQuiz) {
                    const reader = new FileReader();
                    reader.onload = (evento) => finalizarEdicao(evento.target.result);
                    reader.readAsDataURL(arquivoQuiz);
                } else {
                    finalizarEdicao(quizOriginal.imagem || null);
                }
            }
        });
    }

    // da o start inicial montando a tela
    renderizarQuestoes();
    adicionarAlternativa();
    adicionarAlternativa();
});