document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica sessão
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const menuLogin = document.getElementById("menu-login");
    const menuLogout = document.getElementById("menu-logout");
    const menuPerfil = document.getElementById("menu-perfil");
    const menuAdd = document.getElementById("menu-add"); 
    const avaliacao = document.getElementById("avaliacao-container");

    if (usuarioLogado) {
        //esconde o botão de login
        if (menuLogin) menuLogin.classList.add("hide");

         //mostra os botões ocultos
        if (menuLogout) menuLogout.classList.remove("hide");
        if (menuPerfil) menuPerfil.classList.remove("hide");
        if (menuAdd) menuAdd.classList.remove("hide");
        if (avaliacao) avaliacao.classList.remove("hide");
    } else {
        //garante que o estado padrão seja respeitado
        if (menuLogin) menuLogin.classList.remove("hide");
        if (menuLogout) menuLogout.classList.add("hide");
        if (menuAdd) menuAdd.classList.add("hide");
        if (menuPerfil) menuPerfil.classList.add("hide");
    }

    //sair
    //const btnLogout = document.getElementById("btn-logout");
    const btnLogoutPerfil = document.getElementById("btn-logout-perfil");


    if(btnLogoutPerfil) {
        btnLogoutPerfil.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioLogado");
            window.location.href = "home.html";
        });
    }

    // 3. Preenchimento dos dados na tela de Perfil
    const nomeUsuario = document.getElementById("nome-usuario");
    const infoEmail = document.getElementById("info-email");

    if (usuarioLogado) {
        if (nomeUsuario) nomeUsuario.textContent = usuarioLogado.nome;
        if (infoEmail) infoEmail.textContent = usuarioLogado.email;
    }

    // 4. Redirecionamento de segurança
    const paginaAtual = window.location.pathname.split('/').pop();

    if((paginaAtual == "perfil.html") && (!usuarioLogado)){
        window.location.href = "home.html";
    }

    // 5. Menu Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // 6. Função GLOBAL para alterar dados
    window.alterarDado = function(tipo) {
        let novoValor = prompt(`Digite o novo ${tipo}:`, usuarioLogado[tipo]);

        if (!novoValor || novoValor.trim() === "") return;
        novoValor = novoValor.trim();

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        // --- VALIDAÇÃO DE E-MAIL ---
        if (tipo === 'email') {
            // 1. Verifica se o formato é válido (Regex)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(novoValor)) {
                alert("Por favor, insira um e-mail válido (exemplo@dominio.com).");
                return; // Interrompe a função aqui
            }

            // 2. Verifica se o e-mail já existe em OUTRA conta
            const emailJaExiste = usuarios.some(u => u.email === novoValor && u.email !== usuarioLogado.email);
            if (emailJaExiste) {
                alert("Este e-mail já está sendo usado por outro usuário!");
                return;
            }
        }

        // --- ATUALIZAÇÃO NO BANCO (localStorage) ---
        // Procuramos o usuário pelo e-mail ATUAL (que está na sessão)
        const index = usuarios.findIndex(u => u.email === usuarioLogado.email);

        if (index !== -1) {
            // Atualiza no array de todos os usuários
            usuarios[index][tipo] = novoValor;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            // Atualiza o objeto da sessão (o que mantém você logado)
            usuarioLogado[tipo] = novoValor;
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

            alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} atualizado com sucesso!`);
            window.location.reload();
        }
    };
});