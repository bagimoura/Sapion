document.addEventListener("DOMContentLoaded", () => {
    const listaMeusQuizzes = document.getElementById("lista-quizzes");
    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");

    if (!listaMeusQuizzes) return;

    if (quizzes.length === 0) {
        listaMeusQuizzes.innerHTML = "<p style='text-align:center; width:100%; grid-column: 1/-1;'>Você ainda não criou nenhum quiz.</p>";
        return;
    }

    listaMeusQuizzes.innerHTML = quizzes.map(quiz => {
        // Usa a imagem da primeira pergunta como capa ou uma imagem padrão
        const capa = quiz.questoes[0]?.imagem || "../../IMGS/padrao.png";

        return `
            <div class="card-quizzes">
                <button class="btn-favorito">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                
                <img src="${capa}" alt="${quiz.titulo}">
                
                <h3>${quiz.titulo}</h3>
                
                <div class="info-adicional" style="padding: 0 15px 15px; text-align: center;">
                    <p style="font-size: 0.85rem; color: #666; margin-bottom: 10px;">
                        ${quiz.questoes.length} ${quiz.questoes.length === 1 ? 'pergunta' : 'perguntas'}
                    </p>
                    
                    <div class="acoes-quiz" style="display: flex; gap: 8px; justify-content: center;">
                        <button class="btn-editar-estatico" style="cursor: not-allowed; border: 1px solid #ccc; background: #f9f9f9; color: #999; padding: 5px 12px; border-radius: 4px; font-size: 0.8rem;">
                            editar
                        </button>
                        <button onclick="excluirQuiz(${quiz.id})" style="cursor: pointer; border: none; background: #ff4d4d; color: white; padding: 5px 12px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                            excluir
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
});

// Função funcional apenas para excluir
window.excluirQuiz = (id) => {
    if (confirm("Deseja realmente apagar este quiz?")) {
        let quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        quizzes = quizzes.filter(q => q.id !== id);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
        window.location.reload();
    }
};