document.addEventListener("DOMContentLoaded", () => {

    const formCadastro = document.getElementById("cadastrar-receita");
    const container = document.getElementById("lista-receitas");

    let questoes = [];

    function adicionarAlternativa() {
        const containerAlt = document.getElementById("alternativas");
        const index = containerAlt.children.length;

        const letra = String.fromCharCode(65 + index);

        const div = document.createElement("div");
        div.classList.add("alt-item");

        div.innerHTML = `
            <input type="radio" name="correta" value="${index}">
            <input type="text" placeholder="Alternativa ${letra}" class="alt-texto">
        `;

        containerAlt.appendChild(div);
    }

    window.adicionarAlternativa = adicionarAlternativa;

    function adicionarQuestao() {
        let pergunta = document.getElementById("nome_receita").value;

        // 🔥 AQUI está a mudança principal (radio category)
        let materia = document.querySelector('input[name="categoria"]:checked')?.value;

        const imagemInput = document.getElementById("foto_pergunta");
        const arquivo = imagemInput.files[0];

        const alternativasHTML = document.querySelectorAll(".alt-item");
        let alternativas = [];

        alternativasHTML.forEach(item => {
            const texto = item.querySelector(".alt-texto").value;
            alternativas.push(texto);
        });

        const corretaSelecionada = document.querySelector('input[name="correta"]:checked');

        // validação
        if (!pergunta || !materia || alternativas.length < 2 || !corretaSelecionada) {
            alert("Preencha tudo corretamente!");
            return;
        }

        const salvarQuestao = (imgBase64 = null) => {
            const questao = {
                id: Date.now(),
                pergunta,
                materia,
                imagem: imgBase64,
                alternativas,
                correta: parseInt(corretaSelecionada.value)
            };

            questoes.push(questao);
            renderizarQuestoes();

            // limpa campos
            document.getElementById("nome_receita").value = "";
            document.getElementById("foto_pergunta").value = "";
            document.getElementById("alternativas").innerHTML = "";

            adicionarAlternativa();
            adicionarAlternativa();

            document.querySelectorAll('input[name="correta"]').forEach(r => r.checked = false);
            document.querySelectorAll('input[name="categoria"]').forEach(r => r.checked = false);
        };

        if (arquivo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                salvarQuestao(e.target.result);
            };
            reader.readAsDataURL(arquivo);
        } else {
            salvarQuestao(null);
        }
    }

    window.adicionarQuestao = adicionarQuestao;

    function renderizarQuestoes() {
        container.innerHTML = "";

        questoes.forEach(q => {
            const div = document.createElement("div");
            div.classList.add("card-receita");

            div.innerHTML = `
                <h3>${q.pergunta}</h3>

                ${q.imagem ? `<img src="${q.imagem}" style="max-width:200px; border-radius:6px; margin:10px 0;">` : ""}

                <p><strong>Categoria:</strong> ${q.materia}</p>

                <ul>
                    ${q.alternativas.map((alt, i) => {
                        const letra = String.fromCharCode(65 + i);
                        return `<li ${i === q.correta ? 'style="color:green"' : ''}>
                            ${letra}) ${alt}
                        </li>`;
                    }).join("")}
                </ul>
            `;

            container.appendChild(div);
        });
    }

    if (formCadastro) {
        formCadastro.addEventListener("submit", function(event) {
            event.preventDefault();

            if (questoes.length === 0) {
                alert("Adicione pelo menos uma pergunta!");
                return;
            }

            let quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");

            quizzes.push({
                id: Date.now(),
                questoes
            });

            localStorage.setItem("quizzes", JSON.stringify(quizzes));

            alert("Quiz criado com sucesso!");
            window.location.reload();
        });
    }

    // inicia com 2 alternativas
    adicionarAlternativa();
    adicionarAlternativa();
});