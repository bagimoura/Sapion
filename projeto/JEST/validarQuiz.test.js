//falso quando:

// titulo vazio;
// titulo menor que 3 letras;
// array de perguntas vazio;
// enunciado em branco;
// resposta em branco;

const { verificarCampos } = require('./validarQuiz');

test('testeCampos1', () => {
    const quiz = { titulo: 'Oi', perguntas: [{ q: '...' }] };
    expect(verificarCampos(quiz)).toBe(false);
});


test('testeCampos2', () => {
    const quiz = { titulo: 'Quiz de matemática', perguntas: [] };
    expect(verificarCampos(quiz)).toBe(false);
});

test("testeCampos3", () => {
    const quiz = { 
        titulo: 'Quiz de soma', 
        perguntas: [{ enunciado: 'Quanto vale 8 + 8', resposta: '16' }] 
    };
    expect(verificarCampos(quiz)).toBe(true);
});


