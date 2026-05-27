// falso quando:
// quiz já existe nos favoritos;
// usuário não está logado;

const { FavoritosManager } = require('./validarFavoritos.js');

let localStorageMock = {};

beforeEach(() => {
    localStorageMock = {};
    global.localStorage = {
        getItem: jest.fn((key) => localStorageMock[key] || null),
        setItem: jest.fn((key, value) => { localStorageMock[key] = value; }),
        removeItem: jest.fn((key) => { delete localStorageMock[key]; }),
        clear: jest.fn(() => { localStorageMock = {}; })
    };
});


describe('Caixa Branca - Análise de Fluxo de Controle: adicionarFavorito()', () => {

    // usuario nao logado
    test('Fluxo 1: Deve desviar para o primeiro Return False quando a condição (!usuarioLogado) for VERDADEIRA', () => {
        localStorageMock['usuarioLogado'] = null; 
        
        const resultado = FavoritosManager.adicionarFavorito(1);
        
        expect(resultado).toBe(false); 
    });

    // usuario logado
    test('Fluxo 2: Deve passar pelo primeiro IF e desviar no segundo IF quando a condição (favoritos.includes) for VERDADEIRA', () => {
        localStorageMock['usuarioLogado'] = JSON.stringify({ id: 1, email: 't@t.com' });
        localStorageMock['favoritos'] = JSON.stringify([1]); // Quiz 1 já está lá dentro
        
        const resultado = FavoritosManager.adicionarFavorito(1); // Tenta inserir duplicado
        
        expect(resultado).toBe(false);
    });

    test('Fluxo 3: Caminho Feliz - Deve percorrer todas as instruções lógicas sem desvios de erro e alcançar o Return True', () => {
        localStorageMock['usuarioLogado'] = JSON.stringify({ id: 1, email: 't@t.com' });
        localStorageMock['favoritos'] = JSON.stringify([]); // Vazio para não entrar no IF de duplicados
        
        const resultado = FavoritosManager.adicionarFavorito(1);
        
        expect(resultado).toBe(true);
    });

    test('Fluxo 4: Desvio Crítico - Deve simular uma falha estrutural interna para forçar a execução do bloco Catch', () => {
        localStorageMock['usuarioLogado'] = '{json_corrompido_com_erro}'; 
        
        const resultado = FavoritosManager.adicionarFavorito(1);
        
        expect(resultado).toBe(false);
    });
});