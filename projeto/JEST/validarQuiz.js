function verificarCampos(quiz) {
    if (!quiz.titulo || quiz.titulo.trim().length < 3) {
        return false;
    }

    if (!quiz.perguntas || !Array.isArray(quiz.perguntas) || quiz.perguntas.length === 0) {
        return false;
    }

    return true;
}

module.exports = { verificarCampos };
