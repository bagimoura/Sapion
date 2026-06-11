document.addEventListener("DOMContentLoaded", () => {
    // puxa a div onde os cards vao ficar e o usuario logado
    const containerFavoritos = document.getElementById("quizzes-favoritos");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // barra a execucao se nao achar o container na pagina
    if (!containerFavoritos) return;

    // pega so os quizzes favoritados usando o manager do seu colega
    const quizzesFavoritos = FavoritosManager.getQuizzesFavoritos();

    // se n tiver nada favoritado, avisa na tela
    if (quizzesFavoritos.length === 0) {
        containerFavoritos.innerHTML = "<p style='text-align:center; width:100%; grid-column: 1/-1;'>Você ainda não tem nenhum quiz favorito.</p>";
        return;
    }

    // monta os cards usando exatamente o msm estilo do seu outro script
    containerFavoritos.innerHTML = quizzesFavoritos.map(quiz => {
        const capa = quiz.imagem || quiz.questoes[0]?.imagem || "../../IMGS/padrao.png";
        const creatorDisplay = quiz.creatorType === "template" ? quiz.creator : (quiz.creator || "Você");
        const isTemplate = quiz.creatorType === "template";
        
        // checa se o usuario logado eh o dono do quiz pra liberar edicao/exclusao
        const isOwner = usuarioLogado && (
            quiz.creatorEmail === usuarioLogado.email ||
            (!quiz.creatorEmail && quiz.creator === usuarioLogado.nome)
        );

        return `
            <div class="card-quizzes">
                <button class="btn-favorito" data-quiz-id="${quiz.id}">
                    <svg viewBox="0 0 24 24" style="fill: currentColor; color: #ff6b6b;">
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
                    
                    <div class="acoes-quiz" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                        ${!isTemplate ? `<button onclick="location.href='exibir_quiz.html?id=${quiz.id}'" style="cursor: pointer; border: none; background: #00473e; color: white; padding: 8px 16px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                            Realizar Quiz
                        </button>` : '<p style="font-size: 0.75rem; color: #999;">Exemplo padrão</p>'}
                    </div>
                </div>
            </div>
        `;
    }).join("");

    // escuta os cliques no coracaozinho pra remover dos favoritos
    document.querySelectorAll(".btn-favorito").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const quizId = parseInt(btn.dataset.quizId);
            FavoritosManager.removerFavorito(quizId);
            
            // recarrega a pagina na hora pra o card sumir da tela
            window.location.reload();
        });
    });
});