// falso quando:
// termo vazio ou apenas espaços;
// nenhum resultado encontrado;

function filtrar(termo, quizzes = []) {
    if (!termo || termo.trim().length === 0) {
        return [];
    }

    const termoLower = termo.toLowerCase();
    return quizzes.filter(quiz => 
        quiz.titulo.toLowerCase().includes(termoLower) ||
        (quiz.descricao && quiz.descricao.toLowerCase().includes(termoLower))
    );
}

module.exports = { filtrar };
