// falso quando: 

// nome com menos de 3 caracteres;
// email sem @;
// email sem texto antes e depois do @;
// email sem .com;
// senha com menos de 8 caracteres;
// senha sem nenhuma letra maiúscula;
// senha sem nenhum caracter especial;


const { validarNome, validarEmail, validarSenha } = require('./validarCadastro.js');

// NOME
test('validarNome com nome < 3', () => {
  expect(validarNome('Jo')).toBe(false);
});

test('validarNome com nome >= 3', () => {
  expect(validarNome('João')).toBe(true);
});


// EMAIL
// sem @
test('deve retornar false quando email NÃO TEM @', () => {
  expect(validarEmail('emailerrado')).toBe(false);
});

// sem ponto depois do @
test('deve retornar false quando email NÃO TEM PONTO (sem .com)', () => {
  expect(validarEmail('usuario@exemplo')).toBe(false);
});

// sem texto antes do @
test('deve retornar false quando email NÃO TEM TEXTO ANTES DO @', () => {
  expect(validarEmail('@exemplo.com')).toBe(false);
});

// email válido
test('deve retornar true quando email é VÁLIDO', () => {
  expect(validarEmail('usuario@exemplo.com')).toBe(true);
});


// SENHA
// senha curta 
test('deve retornar false quando senha tem MENOS de 8 caracteres', () => {
  expect(validarSenha('Sen1!')).toBe(false);  // 5 chars → falha no {8,}
});

// sem letra maiúscula
test('deve retornar false quando senha NÃO TEM letra maiúscula', () => {
  expect(validarSenha('senha123!')).toBe(false);  // sem A-Z → falha
});

// sem letra minúscula
test('deve retornar false quando senha NÃO TEM letra minúscula', () => {
  expect(validarSenha('SENHA123!')).toBe(false);  // sem a-z → falha
});

// sem número
test('deve retornar false quando senha NÃO TEM número', () => {
  expect(validarSenha('SenhaABC!')).toBe(false);  // sem 0-9 → falha
});

// sem caractere especial
test('deve retornar false quando senha NÃO TEM caractere especial', () => {
  expect(validarSenha('Senha1234')).toBe(false);  // sem @$!%*?& → falha
});

// senha válida (tudo certo)
test('deve retornar true quando senha é VÁLIDA (8+ chars, maiúscula, minúscula, número, especial)', () => {
  expect(validarSenha('Senha123!')).toBe(true);
});