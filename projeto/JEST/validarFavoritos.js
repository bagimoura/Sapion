// falso quando:
// quiz já existe nos favoritos;
// usuário não está logado;

class FavoritosManager {
    static adicionarFavorito(quizId) {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
            
            if (!usuarioLogado) {
                return false;
            }

            let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
            
            if (favoritos.includes(quizId)) {
                return false;
            }
            
            favoritos.push(quizId);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            localStorage.setItem("favoritos_" + usuarioLogado.email, JSON.stringify(favoritos));
            
            return true;
        } catch (error) {
            return false;
        }
    }

    static removerFavorito(quizId) {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
            
            if (!usuarioLogado) {
                return false;
            }

            let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
            const indice = favoritos.indexOf(quizId);
            
            if (indice === -1) {
                return false;
            }
            
            favoritos.splice(indice, 1);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            localStorage.setItem("favoritos_" + usuarioLogado.email, JSON.stringify(favoritos));
            
            return true;
        } catch (error) {
            return false;
        }
    }

    static isFavorito(quizId) {
        try {
            const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
            return favoritos.includes(quizId);
        } catch (error) {
            return false;
        }
    }

    static obterFavoritos() {
        try {
            return JSON.parse(localStorage.getItem("favoritos") || "[]");
        } catch (error) {
            return [];
        }
    }

    static toggleFavorito(quizId) {
        if (this.isFavorito(quizId)) {
            this.removerFavorito(quizId);
            return false;
        } else {
            this.adicionarFavorito(quizId);
            return true;
        }
    }
}

module.exports = { FavoritosManager };
