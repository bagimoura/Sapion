document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("login-form");

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailLogin = document.getElementById("email").value;
        const senhaLogin = document.getElementById("senha").value;

        //pega o array de usuários
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        //busca o email e senha no array
        const usuarioEncontrado = usuarios.find(user => user.email === emailLogin && user.senha === senhaLogin);

        if(usuarioEncontrado){
            //se o usuário foi encontrado, é necessário "criar um sessão" para que a home page possa mostrar os atributos ocultos
            //remove a senha antes de salvar na sessão por segurança
            const sessaoUsuario = {
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(sessaoUsuario));

            alert("Login realizado com sucesso! Bem-vindo, " + usuarioEncontrado.nome);
            
            window.location.href = "home.html"; 

        } else {
            alert("E-mail ou senha incorretos.");
        }
    });

})