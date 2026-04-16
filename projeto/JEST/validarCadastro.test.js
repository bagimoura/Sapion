// falso quando: 

// nome com menos de 3 caracteres;
// email sem @;
// email sem texto antes e depois do @;
// email sem .com;
// senha com menos de 8 caracteres;
// senha sem nenhuma letra maiúscula;
// senha sem nenhum caracter especial;


const { validarNome, validarEmail, validarSenha } = require('./validarCadastro.js');

test('testeNome1', () => {
  expect(validarNome("Carlos")).toBe(true);
});

test('testeNome2', () => {
  expect(validarNome("Jo")).toBe(false);
});

test('testeNome3', () => {
  expect(validarNome("Ana Maria")).toBe(true);
});

test('testeNome4', () => {
  expect(validarNome("Luiza")).toBe(true);
});

test('testeNome4', () => {
  expect(validarNome("Gabriella")).toBe(true);
});

test('testeEmail1', () => {
  expect(validarEmail("contato@site.com")).toBe(true);
});

test('testeEmail2', () => {
  expect(validarEmail("email-errado")).toBe(false);
});

test('testeEmail3', () => {
  expect(validarEmail("usuario@teste.com")).toBe(true);
});

test('testeEmail4', () => {
  expect(validarEmail("usuario!teste.com")).toBe(false);
});

test('testeEmail5', () => {
  expect(validarEmail("usuario/teste.com")).toBe(false);
});

test('testeEmail6', () => {
  expect(validarEmail("usuario-teste.com")).toBe(false);
});

test('testeEmail7', () => {
  expect(validarEmail("email@")).toBe(false);
});

test('testeEmail8', () => {
  expect(validarEmail("email@outlook")).toBe(false);
});

test('testeSenha1', () => {
  expect(validarSenha("Senha123!")).toBe(true);
});

test('testeSenha2', () => {
  expect(validarSenha("123")).toBe(false);
});

test('testeSenha3', () => {
  expect(validarSenha("Seguranca@2026")).toBe(true);
});

test('testeSenha4', () => {
  expect(validarSenha("senha!2026")).toBe(false);
});

test('testeSenha5', () => {
  expect(validarSenha("Senha!2026")).toBe(true);
});

test('testeSenha6', () => {
  expect(validarSenha("Senha123!")).toBe(true);
});

test('testeSenha7', () => {
  expect(validarSenha("Senha12345!")).toBe(true);
});

test('testeSenha8', () => {
  expect(validarSenha("Senha20000%")).toBe(true);
});

test('testeSenha9', () => {
  expect(validarSenha("senhA20000%")).toBe(true);
});