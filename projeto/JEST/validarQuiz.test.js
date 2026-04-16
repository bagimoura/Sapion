//falso quando:

// titulo vazio;
// titulo menor que 3 letras;
// array de perguntas vazio;
// enunciado em branco;
// resposta em branco;

const { verificarCampos } = require('./validarQuiz');

test('testeCampos1', () => {
    const quiz = { titulo: 'Oi', perguntas: [{ enunciado: 'Qual a cor?', resposta: 'Azul' }] };
    expect(verificarCampos(quiz)).toBe(false);
});

test('testeCampos2', () => {
    const quiz = { titulo: 'Quiz de matemática', perguntas: [] };
    expect(verificarCampos(quiz)).toBe(false);
});

test('testeCampos3', () => {
    const quiz = { 
        titulo: 'Quiz de soma', 
        perguntas: [{ enunciado: '  ', resposta: '16' }] 
    };
    expect(verificarCampos(quiz)).toBe(false);
});

test('testeCampos4', () => {
    const quiz = { 
        titulo: 'Quiz de soma', 
        perguntas: [{ enunciado: 'Quanto vale 8 + 8', resposta: '' }] 
    };
    expect(verificarCampos(quiz)).toBe(false);
});

test('testeCampos5', () => {
    const quiz = { 
        titulo: 'Quiz de soma', 
        perguntas: [{ enunciado: 'Quanto vale 8 + 8', resposta: '16' }] 
    };
    expect(verificarCampos(quiz)).toBe(true);
});

test('testeCampos6', () => {
    const quiz = { 
        titulo: 'Quiz multiplicação', 
        perguntas: [{ enunciado: 'Quanto vale 8 * 8', resposta: '' }] 
    };
    expect(verificarCampos(quiz)).toBe(false);
});

test('testeCampos7', () => {
    const quiz = { 
        titulo: 'Quiz multiplicação', 
        perguntas: [{ enunciado: 'Quanto vale 8 * 8', resposta: '64' }] 
    };
    expect(verificarCampos(quiz)).toBe(true);
});

test('testeCampos8', () => {
    const quiz = { 
        titulo: 'Quiz multiplicação', 
        perguntas: [{ enunciado: '', resposta: '' }] 
    };
    expect(verificarCampos(quiz)).toBe(false);
});