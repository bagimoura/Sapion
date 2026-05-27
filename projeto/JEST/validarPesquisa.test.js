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

describe('Caixa Branca - Análise de Fluxo de Controle: filtrar()', () => {

    // campo vazio
    test('Fluxo 1: Deve desviar para o primeiro Return (array vazio) quando o termo for null, vazio ou apenas espaços', () => {
        expect(filtrar(null, quizzesMock)).toEqual([]);
        expect(filtrar('', quizzesMock)).toEqual([]);
        expect(filtrar('   ', quizzesMock)).toEqual([]);
    });

    // titulo correspondente
    test('Fluxo 2: Deve percorrer a estrutura do filter e retornar o quiz correspondente quando o termo bater com o TÍTULO', () => {
        const resultado = filtrar('Física', quizzesMock);
        expect(resultado).toHaveLength(1);
        expect(resultado[0].titulo).toBe('Quiz de Física');

        const resultadoMaiusculo = filtrar('BIOLOGIA', quizzesMock);
        expect(resultadoMaiusculo).toHaveLength(1);
    });

    // encontra pela descricao
    test('Fluxo 3: Deve passar pela validação do título e encontrar o quiz através da sua DESCRIÇÃO', () => {
        const resultado = filtrar('brasileira', quizzesMock); // "brasileira" está apenas na descrição do ID 4
        expect(resultado).toHaveLength(1);
        expect(resultado[0].id).toBe(4);
    });

    // codigo funciona mesmo se um quiz nao tiver descricao
    test('Fluxo 4: Deve garantir que o código não quebre e continue filtrando mesmo se um quiz NÃO possuir descrição', () => {
        const mockComQuizSemDescricao = [
            { id: 5, titulo: 'Quiz Sem Descrição' }, // Não tem o campo descrição
            { id: 6, titulo: 'Outro Quiz', descricao: 'Texto qualquer' }
        ];

        // Força o código a passar pela linha: quiz.descricao && quiz.descricao.toLowerCase()...
        // Se a proteção do "&&" não existisse no código interno, o JavaScript daria um erro de "undefined"
        const resultado = filtrar('Outro', mockComQuizSemDescricao);
        
        expect(resultado).toHaveLength(1);
        expect(resultado[0].id).toBe(6);
    });

    // nenhum resultado
    test('Fluxo 5: Deve percorrer todos os elementos e retornar um array vazio quando o termo não corresponder a nenhum título ou descrição', () => {
        const resultado = filtrar('Português', quizzesMock);
        expect(resultado).toHaveLength(0);
    });

    test('Fluxo Extra: Deve retornar todos os quizzes quando o termo for genérico o suficiente para abranger todos', () => {
        const resultado = filtrar('Quiz', quizzesMock);
        expect(resultado).toHaveLength(4);
    });
});