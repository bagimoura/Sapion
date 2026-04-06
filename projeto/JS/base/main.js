document.addEventListener("DOMContentLoaded", () => {
    
    //verifica se existe um usuário logado na "sessão"
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


    // if (btnLogout) {
    //     btnLogout.addEventListener("click", (e) => {
    //         e.preventDefault();

    //         //remove a sessão do localstorage
    //         localStorage.removeItem("usuarioLogado");

    //         //recarrega a página
    //         window.location.reload();
    //         window.location.href = "home.html";
    //     });
    // }

    if(btnLogoutPerfil) {
        btnLogoutPerfil.addEventListener("click", (e) => {
            e.preventDefault();

            //remove a sessão do localstorage
            localStorage.removeItem("usuarioLogado");

            //recarrega a página
            window.location.reload();
            window.location.href = "home.html";
            
        });
    }

    const paginaAtual = window.location.pathname.split('/').pop();

    if((paginaAtual == "perfil.html") && (!usuarioLogado)){
        window.location.href = "home.html";
    }

    

    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    const nomeUsuario = document.getElementById("nome-usuario");

    if (nomeUsuario && usuarioLogado) {
    nomeUsuario.textContent = usuarioLogado.nome;
    }



});