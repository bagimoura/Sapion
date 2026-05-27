//falso quando:

// titulo vazio;
// titulo menor que 3 letras;
// array de perguntas vazio;
// enunciado em branco;
// resposta em branco;

const { verificarCampos } = require('./validarQuiz');

describe('Caixa Branca - Análise de Fluxo de Controle: verificarCampos()', () => {

    // === titulo do quiz pequeno ou vazio
    test('Fluxo 1: Deve desviar para o primeiro Return False se o título for menor que 3 caracteres ou inexistente', () => {
        const quizTituloCurto = { titulo: 'Oi', perguntas: [{ enunciado: 'Qual a cor?', resposta: 'Azul' }] };
        expect(verificarCampos(quizTituloCurto)).toBe(false);

        const quizSemTitulo = { perguntas: [{ enunciado: 'Qual a cor?', resposta: 'Azul' }] };
        expect(verificarCampos(quizSemTitulo)).toBe(false);
    });

    // === quiz sem perguntas
    test('Fluxo 2: Deve passar pelo título, mas desviar para o segundo Return False se a estrutura do array de perguntas for inválida', () => {
        const quizComPerguntasVazias = { titulo: 'Quiz de matemática', perguntas: [] };
        expect(verificarCampos(quizComPerguntasVazias)).toBe(false);

        const quizFisicaVazio = { titulo: 'Física', perguntas: [] };
        expect(verificarCampos(quizFisicaVazio)).toBe(false);

        // Caso 2: Nem sequer enviou o array de perguntas (testa o quiz.perguntas && Array.isArray)
        const quizSemArrayPerguntas = { titulo: 'Quiz de Química' };
        expect(verificarCampos(quizSemArrayPerguntas)).toBe(false);
    });

    // === enunciado vazio
    test('Fluxo 3: Deve passar pelas estruturas, mas desviar para o terceiro Return False se o ENUNCIADO de alguma pergunta estiver em branco', () => {
        const quizEnunciadoEspaco = { 
            titulo: 'Quiz de soma', 
            perguntas: [{ enunciado: '  ', resposta: '16' }] 
        };
        expect(verificarCampos(quizEnunciadoEspaco)).toBe(false);

        // Enunciado completamente vazio
        const quizEnunciadoVazio = { 
            titulo: 'Quiz multiplicação', 
            perguntas: [{ enunciado: '', resposta: '64' }] 
        };
        expect(verificarCampos(quizEnunciadoVazio)).toBe(false);
    });

    test('Fluxo 4: Deve passar pelas estruturas, mas desviar para o terceiro Return False se a RESPOSTA de alguma pergunta estiver em branco', () => {
        // Resposta vazia na soma
        const quizRespostaVaziaSoma = { 
            titulo: 'Quiz de soma', 
            perguntas: [{ enunciado: 'Quanto vale 8 + 8', resposta: '' }] 
        };
        expect(verificarCampos(quizRespostaVaziaSoma)).toBe(false);

        // Resposta vazia na multiplicação
        const quizRespostaVaziaMult = { 
            titulo: 'Quiz multiplicação', 
            perguntas: [{ enunciado: 'Quanto vale 8 * 8', resposta: '' }] 
        };
        expect(verificarCampos(quizRespostaVaziaMult)).toBe(false);

        // Ambas vazias (enunciado e resposta vazios)
        const quizAmbosVazios = { 
            titulo: 'Quiz multiplicação', 
            perguntas: [{ enunciado: '', resposta: '' }] 
        };
        expect(verificarCampos(quizAmbosVazios)).toBe(false);
    });

    // tudo certo
    test('Fluxo 5: Caminho Feliz - Deve percorrer todas as funções e subcondições com sucesso e retornar True', () => {
        // Validação correta de soma
        const quizSomaValido = { 
            titulo: 'Quiz de soma', 
            perguntas: [{ enunciado: 'Quanto vale 8 + 8', resposta: '16' }] 
        };
        expect(verificarCampos(quizSomaValido)).toBe(true);

        // Validação correta de multiplicação
        const quizMultValido = { 
            titulo: 'Quiz multiplicação', 
            perguntas: [{ enunciado: 'Quanto vale 8 * 8', resposta: '64' }] 
        };
        expect(verificarCampos(quizMultValido)).toBe(true);
    });
});