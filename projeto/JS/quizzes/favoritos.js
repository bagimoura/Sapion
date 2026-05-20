// Gerenciador de Quizzes Favoritos
window.FavoritosManager = {
    // FUNÇÃO NOVA: Obter chave específica do usuário logado
    getKey: function() {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (usuarioLogado && usuarioLogado.email) {
            // Cria uma chave única por usuário usando o e-mail
            return "quiz_favoritos_" + usuarioLogado.email;
        }
        return "quiz_favoritos"; // Fallback caso não ache o usuário
    },

    // Obter todas as IDs de quizzes favoritos do usuário atual
    getFavoritos: function() {
        // Agora busca pela chave específica dele
        return JSON.parse(localStorage.getItem(this.getKey()) || "[]");
    },

    // Verificar se um quiz é favorito
    isFavorito: function(quizId) {
        const favoritos = this.getFavoritos();
        return favoritos.includes(quizId);
    },

    // Adicionar quiz aos favoritos
    adicionarFavorito: function(quizId) {
        const favoritos = this.getFavoritos();
        if (!favoritos.includes(quizId)) {
            favoritos.push(quizId);
            // Salva na chave específica
            localStorage.setItem(this.getKey(), JSON.stringify(favoritos));
        }
    },

    // Remover quiz dos favoritos
    removerFavorito: function(quizId) {
        let favoritos = this.getFavoritos();
        favoritos = favoritos.filter(id => id !== quizId);
        // Salva na chave específica
        localStorage.setItem(this.getKey(), JSON.stringify(favoritos));
    },

    // Toggle favorito (adiciona ou remove)
    toggleFavorito: function(quizId) {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        
        // Se não tiver ninguém logado, barra a ação
        if (!usuarioLogado) {
            alert("Você precisa estar logado para favoritar um quiz!");
            return null; // Retorna null para avisar a interface que a ação falhou
        }

        if (this.isFavorito(quizId)) {
            this.removerFavorito(quizId);
            return false;
        } else {
            this.adicionarFavorito(quizId);
            return true;
        }
    },

    // Obter quizzes completos que são favoritos
    getQuizzesFavoritos: function() {
        const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        const favoritos = this.getFavoritos();
        return quizzes.filter(quiz => favoritos.includes(quiz.id));
    }
};