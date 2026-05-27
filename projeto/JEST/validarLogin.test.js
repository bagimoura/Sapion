// falso quando:
// email ou senha incorretos;
// usuário não encontrado;

const { validarLogin, efetuarLogin } = require('./validarLogin.js');

const usuariosMock = [
    { email: 'teste@exemplo.com', senha: 'Senha123!', nome: 'Teste User', id: 1 },
    { email: 'user@mail.com', senha: 'Segura@2026', nome: 'Outro User', id: 2 }
];

describe('Caixa Branca - Análise de Fluxo: validarLogin()', () => {

    // find funciona
    test('Fluxo 1: Deve encontrar o usuário correspondente e retornar o objeto quando e-mail e senha forem válidos', () => {
        const resultado = validarLogin('teste@exemplo.com', 'Senha123!', usuariosMock);
        
        expect(resultado).toBeTruthy();
        expect(resultado.id).toBe(1);
    });

    // senha errada
    test('Fluxo 2: Deve retornar null quando o e-mail existir mas a senha estiver incorreta', () => {
        const resultado = validarLogin('teste@exemplo.com', 'SenhaErrada', usuariosMock);
        expect(resultado).toBeNull();
    });

    // usuario nao existe
    test('Fluxo 3: Deve retornar null quando o e-mail do usuário não existir na base de dados', () => {
        const resultado = validarLogin('naoexiste@mail.com', 'Senha123!', usuariosMock);
        expect(resultado).toBeNull();
    });
});

describe('Caixa Branca - Análise de Fluxo de Controle: efetuarLogin()', () => {

    // campos vazios
    test('Fluxo 1: Deve desviar para o primeiro Return se o e-mail ou a senha forem enviados em branco/vazios', () => {
        const resultado = efetuarLogin('', 'Senha123!', usuariosMock);
        
        expect(resultado.sucesso).toBe(false);
        expect(resultado.mensagem).toBe("E-mail ou senha incorretos.");
        expect(resultado.usuario).toBeNull();
    });

    // dados incorretos
    test('Fluxo 2: Deve passar pela primeira validação, mas desviar para o bloco ELSE (dados incorretos)', () => {
        const resultado = efetuarLogin('teste@exemplo.com', 'crrada', usuariosMock); 
        
        expect(resultado.sucesso).toBe(false);
        expect(resultado.mensagem).toBe("E-mail ou senha incorretos.");
        expect(resultado.usuario).toBeNull();
    });

    // login correto
    test('Fluxo 3: Caminho Feliz - Deve validar os dados, entrar no bloco IF (usuarioEncontrado) e retornar a sessão sem a senha', () => {
        const resultado = efetuarLogin('teste@exemplo.com', 'Senha123!', usuariosMock);
        
        expect(resultado.sucesso).toBe(true);
        expect(resultado.mensagem).toBe("Login realizado com sucesso!");
        
        // Validação de segurança crucial do código interno:
        expect(resultado.usuario.email).toBe('teste@exemplo.com');
        expect(resultado.usuario.senha).toBeUndefined(); // Garante que a linha que remove a senha funcionou no fluxo!
    });
});