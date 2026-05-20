// falso quando:
// quiz já existe nos favoritos;
// usuário não está logado;

const { FavoritosManager } = require('./validarFavoritos.js');

let localStorageMock = {};

beforeEach(() => {
    localStorageMock = {};
    
    global.localStorage = {
        getItem: jest.fn((key) => localStorageMock[key] || null),
        setItem: jest.fn((key, value) => {
            localStorageMock[key] = value;
        }),
        removeItem: jest.fn((key) => {
            delete localStorageMock[key];
        }),
        clear: jest.fn(() => {
            localStorageMock = {};
        })
    };

    localStorageMock['usuarioLogado'] = JSON.stringify({
        id: 1,
        nome: 'Teste User',
        email: 'teste@exemplo.com'
    });
});

test('testeAdicionarFavorito1', () => {
    const resultado = FavoritosManager.adicionarFavorito(1);
    expect(resultado).toBe(true);
    
    const favoritos = JSON.parse(localStorageMock['favoritos']);
    expect(favoritos).toContain(1);
});

test('testeAdicionarFavorito2', () => {
    FavoritosManager.adicionarFavorito(1);
    const resultado = FavoritosManager.adicionarFavorito(1);
    expect(resultado).toBe(false);
});

test('testeAdicionarFavorito3', () => {
    FavoritosManager.adicionarFavorito(1);
    FavoritosManager.adicionarFavorito(5);
    FavoritosManager.adicionarFavorito(12);
    
    const favoritos = JSON.parse(localStorageMock['favoritos']); // equivalente ao adicionarFavorito() do teste de caixa branca
    expect(favoritos).toEqual([1, 5, 12]);
});

test('testeRemoverFavorito1', () => {
    FavoritosManager.adicionarFavorito(1);
    FavoritosManager.adicionarFavorito(5);
    
    const resultado = FavoritosManager.removerFavorito(1);
    expect(resultado).toBe(true);
    
    const favoritos = JSON.parse(localStorageMock['favoritos']);
    expect(favoritos).toEqual([5]);
});

test('testeIsFavorito1', () => {
    FavoritosManager.adicionarFavorito(7);
    expect(FavoritosManager.isFavorito(7)).toBe(true);
});

test('testeIsFavorito2', () => {
    FavoritosManager.adicionarFavorito(7);
    expect(FavoritosManager.isFavorito(99)).toBe(false);
});

test('testeToggleFavorito1', () => {
    const resultado = FavoritosManager.toggleFavorito(5);
    expect(resultado).toBe(true);
    
    const favoritos = JSON.parse(localStorageMock['favoritos']);
    expect(favoritos).toContain(5);
});

test('testeToggleFavorito2', () => {
    FavoritosManager.adicionarFavorito(5);
    const resultado = FavoritosManager.toggleFavorito(5);
    expect(resultado).toBe(false);
    
    const favoritos = JSON.parse(localStorageMock['favoritos']);
    expect(favoritos).not.toContain(5);
});

test('testeObterFavoritos', () => {
    FavoritosManager.adicionarFavorito(1);
    FavoritosManager.adicionarFavorito(2);
    FavoritosManager.adicionarFavorito(3);
    
    const favoritos = FavoritosManager.obterFavoritos();
    expect(favoritos).toEqual([1, 2, 3]);
});
