// falso quando:
// termo vazio ou apenas espaços;
// nenhum resultado encontrado;

const { filtrar } = require('./validarPesquisa.js');

const quizzesMock = [
    { id: 1, titulo: 'Quiz de Física', descricao: 'Aprenda os fundamentos da física' },
    { id: 2, titulo: 'Quiz de Matemática', descricao: 'Teste seus conhecimentos em matemática' },
    { id: 3, titulo: 'Quiz de Biologia', descricao: 'Descubra mais sobre biologia' },
    { id: 4, titulo: 'História do Brasil', descricao: 'Quiz sobre história brasileira' }
];

test('testeFiltro1', () => {
    const resultado = filtrar('Física', quizzesMock);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe('Quiz de Física');
});

test('testeFiltro2', () => {
    const resultado = filtrar('Quiz', quizzesMock);
    expect(resultado.length).toBe(4);
});

test('testeFiltro3', () => {
    const resultado = filtrar('Português', quizzesMock);
    expect(resultado).toHaveLength(0);
});

test('testeFiltro4', () => {
    const resultado = filtrar('história', quizzesMock);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(4);
});

test('testeFiltro5', () => {
    const resultado = filtrar('BIOLOGIA', quizzesMock);
    expect(resultado).toHaveLength(1);
});

test('testeFiltro6', () => {
    const resultado = filtrar('   ', quizzesMock); // equivalente ao filtrar() do teste de caixa branca
    expect(resultado).toEqual([]);
});

test('testeFiltro7', () => {
    const resultado = filtrar('', quizzesMock);
    expect(resultado).toEqual([]);
});

test('testeFiltro8', () => {
    const resultado = filtrar(null, quizzesMock);
    expect(resultado).toEqual([]);
});
