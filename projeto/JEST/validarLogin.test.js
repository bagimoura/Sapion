// falso quando:
// email ou senha incorretos;
// usuário não encontrado;

const { validarLogin, efetuarLogin } = require('./validarLogin.js');

const usuariosMock = [
    { email: 'teste@exemplo.com', senha: 'Senha123!', nome: 'Teste User', id: 1 },
    { email: 'user@mail.com', senha: 'Segura@2026', nome: 'Outro User', id: 2 }
];

test('testeLogin1', () => {
    const resultado = validarLogin('teste@exemplo.com', 'Senha123!', usuariosMock);
    expect(resultado).toBeTruthy();
});

test('testeLogin2', () => {
    const resultado = validarLogin('user@mail.com', 'Segura@2026', usuariosMock);
    expect(resultado).toBeTruthy();
});

test('testeLogin3', () => {
    const resultado = validarLogin('teste@exemplo.com', 'SenhaErrada', usuariosMock);
    expect(resultado).toBeNull();
});

test('testeLogin4', () => {
    const resultado = validarLogin('naoexiste@mail.com', 'Senha123!', usuariosMock);
    expect(resultado).toBeNull();
});

test('testeLogin5', () => {
    const resultado = efetuarLogin('teste@exemplo.com', 'crrada', usuariosMock);  //equivalente ao validarLogin() do teste de caixa branca
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe("E-mail ou senha incorretos.");
});

test('testeLogin6', () => {
    const resultado = efetuarLogin('teste@exemplo.com', 'Senha123!', usuariosMock);
    expect(resultado.sucesso).toBe(true);
    expect(resultado.usuario.email).toBe('teste@exemplo.com');
});
