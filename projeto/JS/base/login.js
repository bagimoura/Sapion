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
            //salva todos os dados do usuário na sessão, exceto a senha (por segurança)
            const { senha, ...sessaoUsuario } = usuarioEncontrado;

            localStorage.setItem("usuarioLogado", JSON.stringify(sessaoUsuario));

            alert("Login realizado com sucesso! Bem-vindo, " + usuarioEncontrado.nome);
            
            window.location.href = "home.html"; 

        } else {
            alert("E-mail ou senha incorretos.");
        }
    });

    // Toggle para mostrar/esconder senha
     const toggleBtn = document.getElementById("toggle-senha");
    const senhaInput = document.getElementById("senha");
    const iconeSenha = document.querySelector(".icone-senha");

    if (toggleBtn && senhaInput) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const tipo = senhaInput.type === "password" ? "text" : "password";
            senhaInput.type = tipo;
            if (tipo === "text") {
                // Caminho da imagem para quando a senha estiver VISÍVEL
                iconeSenha.src = "../../IMGS/olho_aberto.png"; 
            } else {
                // Caminho da imagem para quando a senha estiver OCULTA (a sua imagem padrão)
                iconeSenha.src = "../../IMGS/teste.jpg"; 
            }
        });
    }

});
