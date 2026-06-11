document.addEventListener("DOMContentLoaded", () => {
    const categoriaElement = document.querySelector(".grade-quizzes[data-categoria]");
    
    if (!categoriaElement) return;

    const categoria = categoriaElement.dataset.categoria;
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    let quizzesToDisplay = quizzes;
    
    if (categoria !== "meus-quizzes") {
        quizzesToDisplay = quizzes.filter(quiz => {
            if (!quiz.questoes || !Array.isArray(quiz.questoes)) return false;
            return quiz.questoes.some(q => 
                q.materia && q.materia.toLowerCase() === categoria.toLowerCase()
            );
        });
    }

    if (quizzesToDisplay.length === 0) {
        categoriaElement.innerHTML = "<p style='text-align:center; width:100%; grid-column: 1/-1;'>Nenhum quiz disponível nesta categoria.</p>";
        return;
    }

    categoriaElement.innerHTML = quizzesToDisplay.map(quiz => {
        const capa = quiz.imagem || quiz.questoes[0]?.imagem || "../../IMGS/padrao.png";
        const isFavorito = FavoritosManager.isFavorito(quiz.id);
        const creatorDisplay = quiz.creatorType === "template" ? quiz.creator : (quiz.creator || "Você");
        const isTemplate = quiz.creatorType === "template";
        const isOwner = usuarioLogado && quiz.creator === usuarioLogado.nome;

        return `
            <div class="card-quizzes">
                <button class="btn-favorito" data-quiz-id="${quiz.id}">
                    <svg viewBox="0 0 24 24" ${isFavorito ? 'style="fill: currentColor; color: #ff6b6b;"' : ''}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                
                <img src="${capa}" alt="${quiz.titulo}">
                
                <h3>${quiz.titulo}</h3>
                <p style="font-size: 0.75rem; color: #999; margin: -5px 5px; text-align: center;">Por: ${creatorDisplay}</p>
                
                <div class="info-adicional" style="padding: 0 15px 15px; text-align: center;">
                    <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">
                        ${quiz.questoes.length} ${quiz.questoes.length === 1 ? 'pergunta' : 'perguntas'}
                    </p>
                    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        ${!isTemplate ? `<button onclick="location.href='../quizzes/exibir_quiz.html?id=${quiz.id}'" style="cursor: pointer; border: none; background: #00473e; color: white; padding: 8px 16px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                            Realizar Quiz
                        </button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // Adiciona event listeners para os botões de favorito
    document.querySelectorAll(".btn-favorito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const quizId = parseInt(btn.dataset.quizId);
            const isFavorito = FavoritosManager.toggleFavorito(quizId);
            const svg = btn.querySelector("svg");
            
            if (isFavorito) {
                svg.style.fill = "currentColor";
                svg.style.color = "#ff6b6b";
            } else {
                svg.style.fill = "none";
                svg.style.color = "currentColor";
            }
        });
    });
});

window.excluirQuiz = (id) => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const quiz = quizzes.find(q => q.id === id);

    if (!usuarioLogado) {
        alert("Você precisa estar logado para deletar um quiz!");
        return;
    }

    if (!quiz) {
        alert("Quiz não encontrado!");
        return;
    }

    const isTemplate = quiz.creatorType === "template";
    const isOwner = quiz.creatorEmail === usuarioLogado.email ||
        (!quiz.creatorEmail && quiz.creator === usuarioLogado.nome);

    if (isTemplate) {
        alert("Você não pode deletar os quizzes de exemplo!");
        return;
    }

    if (!isOwner) {
        alert("Você só pode deletar seus próprios quizzes!");
        return;
    }

    if (confirm("Deseja realmente apagar este quiz?")) {
        let quizzesData = JSON.parse(localStorage.getItem("quizzes") || "[]");
        quizzesData = quizzesData.filter(q => q.id !== id);
        localStorage.setItem("quizzes", JSON.stringify(quizzesData));
        window.location.reload();
    }
};