function validarTitulo(quiz) {
    return quiz.titulo && quiz.titulo.trim().length >= 3;
}

function validarEstruturaPerguntas(quiz) {
    return quiz.perguntas && Array.isArray(quiz.perguntas) && quiz.perguntas.length > 0;
}

function validarConteudoPerguntas(quiz) {
    if (!validarEstruturaPerguntas(quiz)) return false;

    return quiz.perguntas.every(p => {
        const temEnunciado = p.enunciado && p.enunciado.trim().length > 0;
        const temResposta = p.resposta && p.resposta.trim().length > 0;
        return temEnunciado && temResposta;
    });
}

function verificarCampos(quiz) {
    if (!validarTitulo(quiz)) {
        return false;
    }

    if (!validarEstruturaPerguntas(quiz)) {
        return false;
    }

    if (!validarConteudoPerguntas(quiz)) {
        return false;
    }

    return true;
}

module.exports = { verificarCampos };