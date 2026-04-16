document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const inputEmail = document.getElementById('input-email');
    const inputSenha = document.getElementById('input-senha');
    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');
    const btnSalvar = document.getElementById('btn-salvar');

    // IMPORTANTE: Não preenchemos o value para a caixa vir limpa, 
    // mas guardamos o email atual para comparar depois.
    const emailAtual = usuarioLogado ? usuarioLogado.email : "";

    btnSalvar.addEventListener('click', (e) => {
        e.preventDefault();
        
        let temAlteracao = false;
        let erroValidacao = false;

        // Limpa mensagens
        erroEmail.innerText = "";
        erroSenha.innerText = "";

        const novoEmail = inputEmail.value.trim();
        const novaSenha = inputSenha.value.trim();

        // --- LÓGICA DO E-MAIL ---
        // Só entra aqui se o usuário digitou algo DIFERENTE do e-mail atual
        if (novoEmail !== "" && novoEmail !== emailAtual) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(novoEmail)) {
                erroEmail.innerText = "Formato de e-mail inválido.";
                erroValidacao = true;
            } else if (usuarios.some(u => u.email === novoEmail)) {
                erroEmail.innerText = "Este e-mail já está em uso.";
                erroValidacao = true;
            } else {
                temAlteracao = true;
            }
        }

        // --- LÓGICA DA SENHA ---
        // Só entra aqui se o usuário digitou algo no campo de senha
        if (novaSenha !== "") {
            if (novaSenha.length < 6) {
                erroSenha.innerText = "A senha deve ter pelo menos 6 caracteres.";
                erroValidacao = true;
            } else {
                temAlteracao = true;
            }
        }

        // --- SALVAMENTO ---
        if (!erroValidacao && temAlteracao) {
            const index = usuarios.findIndex(u => u.email === emailAtual);
            
            if (index !== -1) {
                // Se mudou o email, atualiza
                if (novoEmail !== "" && novoEmail !== emailAtual) {
                    usuarios[index].email = novoEmail;
                }
                // Se mudou a senha, atualiza
                if (novaSenha !== "") {
                    usuarios[index].senha = novaSenha;
                }

                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));

                alert("Dados atualizados com sucesso!");
                window.location.href = "perfil.html";
            }
        } else if (!temAlteracao && !erroValidacao) {
            alert("Nenhuma alteração foi feita.");
        }
    });
});