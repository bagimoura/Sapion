// falso quando:
// email ou senha incorretos;
// usuário não encontrado;

function validarLogin(email, senha, usuarios = []) {
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);
    return usuarioEncontrado || null;
}

function efetuarLogin(emailLogin, senhaLogin, usuarios = []) {
    if (!emailLogin || !senhaLogin) {
        return { sucesso: false, usuario: null, mensagem: "E-mail ou senha incorretos." };
    }

    const usuarioEncontrado = usuarios.find(user => 
        user.email === emailLogin && user.senha === senhaLogin
    );
    
    if (usuarioEncontrado) {
        const { senha, ...sessaoUsuario } = usuarioEncontrado;
        return {
            sucesso: true,
            usuario: sessaoUsuario,
            mensagem: "Login realizado com sucesso!"
        };
    } else {
        return {
            sucesso: false,
            usuario: null,
            mensagem: "E-mail ou senha incorretos."
        };
    }
}

module.exports = { validarLogin, efetuarLogin };
