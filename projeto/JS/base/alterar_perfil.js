document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const inputNome = document.getElementById('input-nome');
    const inputEmail = document.getElementById('input-email');
    const inputSenha = document.getElementById('input-senha');
    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');

    const inputFoto = document.getElementById('foto_perfil');
    const imgAvatar = document.getElementById('avatar-usuario');
    const txtSobreMim = document.getElementById('sobre-mim-text');
    const checkboxes = document.querySelectorAll('input[name="materias"]');

    const btnSalvar = document.getElementById('btn-salvar');

    // Controla a exibição dos campos baseado no tipo de alteração vindo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tipoAlteracao = urlParams.get('tipo');

    const grupoNome = document.getElementById('grupo-nome');
    const grupoEmail = document.getElementById('grupo-email');
    const grupoSenha = document.getElementById('grupo-senha');
    const tituloPagina = document.getElementById('titulo-pagina');

    if (tipoAlteracao === 'nome') {
        if (tituloPagina) tituloPagina.innerText = "Alterar Nome de Usuário";
        if (grupoEmail) grupoEmail.classList.add('hide');
        if (grupoSenha) grupoSenha.classList.add('hide');
    } else if (tipoAlteracao === 'senha') {
        if (tituloPagina) tituloPagina.innerText = "Alterar Senha";
        if (grupoNome) grupoNome.classList.add('hide');
        if (grupoEmail) grupoEmail.classList.add('hide');
    } else if (tipoAlteracao === 'email') {
        if (tituloPagina) tituloPagina.innerText = "Alterar E-mail";
        if (grupoNome) grupoNome.classList.add('hide');
        if (grupoSenha) grupoSenha.classList.add('hide');
    }

    // IMPORTANTE: Não preenchemos o value para a caixa vir limpa,
    // mas guardamos o email atual para comparar depois.
    const getEmailAtual = () => usuarioLogado ? usuarioLogado.email : "";

    if (usuarioLogado) {
        if (inputNome && usuarioLogado.nome) {
            inputNome.value = usuarioLogado.nome;
        }
        if (imgAvatar && usuarioLogado.foto) {
            imgAvatar.src = usuarioLogado.foto;
        }
        if (txtSobreMim && usuarioLogado.sobreMim) {
            txtSobreMim.value = usuarioLogado.sobreMim;
        }
        if (checkboxes && usuarioLogado.materiasFavoritas) {
            checkboxes.forEach(cb => {
                if (usuarioLogado.materiasFavoritas.includes(cb.value)) {
                    cb.checked = true;
                }
            });
        }
    }

    if (inputFoto && imgAvatar) {
        inputFoto.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imgAvatar.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (checkboxes) {
        checkboxes.forEach(cb => {
            cb.addEventListener("change", () => {
                const selecionados = document.querySelectorAll('input[name="materias"]:checked');
                if (selecionados.length > 5) {
                    cb.checked = false;
                    alert("Escolha no máximo 5 matérias.");
                }
            });
        });
    }

    // --- BOTÕES EXCLUSIVOS DA PERFIL.HTML ---

    // Botão Salvar Sobre Mim
    const btnSalvarSobre = document.getElementById('btn-salvar-sobre');
    if (btnSalvarSobre) {
        btnSalvarSobre.addEventListener('click', () => {
            if (!usuarioLogado) return;
            const index = usuarios.findIndex(u => u.email === getEmailAtual());
            if (index === -1) return;

            usuarios[index].sobreMim = txtSobreMim ? txtSobreMim.value : "";
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));
            alert("Sobre Mim salvo com sucesso!");
        });
    }

    // Botão Salvar Matérias
    const btnSalvarMaterias = document.getElementById('btn-salvar-materias');
    if (btnSalvarMaterias) {
        btnSalvarMaterias.addEventListener('click', () => {
            if (!usuarioLogado) return;
            const index = usuarios.findIndex(u => u.email === getEmailAtual());
            if (index === -1) return;

            const selecionados = document.querySelectorAll('input[name="materias"]:checked');
            const listaNovasMaterias = Array.from(selecionados).map(cb => cb.value);
            usuarios[index].materiasFavoritas = listaNovasMaterias;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));
            alert("Disciplinas favoritas salvas com sucesso!");
        });
    }

    // Listener de foto (perfil.html)
    const inputFotoPerfil = document.getElementById('foto_perfil');
    const imgAvatarPerfil = document.getElementById('avatar-usuario');
    if (inputFotoPerfil && imgAvatarPerfil) {
        inputFotoPerfil.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    imgAvatarPerfil.src = event.target.result;

                    // Salva imediatamente ao selecionar
                    if (!usuarioLogado) return;
                    const index = usuarios.findIndex(u => u.email === getEmailAtual());
                    if (index === -1) return;
                    usuarios[index].foto = event.target.result;
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- FIM BOTÕES DA PERFIL.HTML ---

    if (!btnSalvar) return;

    btnSalvar.addEventListener('click', (e) => {
        e.preventDefault();

        let temAlteracao = false;
        let erroValidacao = false;

        // Limpa mensagens
        if (erroEmail) erroEmail.innerText = "";
        if (erroSenha) erroSenha.innerText = "";

        const index = usuarios.findIndex(u => u.email === getEmailAtual());
        if (index === -1) return;

        const novoNome = inputNome ? inputNome.value.trim() : "";
        const novoEmail = inputEmail ? inputEmail.value.trim() : "";
        const novaSenha = inputSenha ? inputSenha.value.trim() : "";

        // --- LÓGICA DO NOME ---
        if (inputNome && grupoNome && !grupoNome.classList.contains('hide')) {
            if (novoNome !== "" && novoNome !== (usuarioLogado?.nome || "")) {
                const tabelaLetras = /^[A-ZÁÉÍÓÚÂÊÔÀÜÇ]/;
                
                if (novoNome.length <= 3) {
                    alert("O nome de usuário deve conter mais de 3 letras.");
                    erroValidacao = true;
                } else if (!tabelaLetras.test(novoNome)) {
                    alert("O nome de usuário deve começar com uma letra maiúscula.");
                    erroValidacao = true;
                } else {
                    usuarios[index].nome = novoNome;
                    temAlteracao = true;
                }
            }
        }

        // --- LÓGICA DO E-MAIL ---
        // Só entra aqui se o usuário digitou algo DIFERENTE do e-mail atual
        if (inputEmail && grupoEmail && !grupoEmail.classList.contains('hide')) {
            if (novoEmail === "") {
                if (erroEmail) erroEmail.innerText = "O campo de e-mail não pode ficar vazio.";
                erroValidacao = true;
            } else if (novoEmail !== getEmailAtual()) {
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexEmail.test(novoEmail)) {
                    if (erroEmail) erroEmail.innerText = "Formato de e-mail inválido.";
                    erroValidacao = true;
                } else if (usuarios.some(u => u.email === novoEmail)) {
                    if (erroEmail) erroEmail.innerText = "Este e-mail já está em uso.";
                    erroValidacao = true;
                } else {
                    // Migra os favoritos da chave antiga para a nova antes de trocar o e-mail
                    const chaveAntiga = "quiz_favoritos_" + getEmailAtual();
                    const chaveNova = "quiz_favoritos_" + novoEmail;
                    const favoritosAtuais = localStorage.getItem(chaveAntiga);
                    if (favoritosAtuais) {
                        localStorage.setItem(chaveNova, favoritosAtuais);
                        localStorage.removeItem(chaveAntiga);
                    }

                    // Migra o creatorEmail dos quizzes do usuário
                    const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
                    const quizzesAtualizados = quizzes.map(q => {
                        if (q.creatorEmail === getEmailAtual()) {
                            return { ...q, creatorEmail: novoEmail };
                        }
                        return q;
                    });
                    localStorage.setItem("quizzes", JSON.stringify(quizzesAtualizados));

                    usuarios[index].email = novoEmail;
                    // Atualiza o e-mail em memória para evitar inconsistência
                    usuarioLogado.email = novoEmail;
                    temAlteracao = true;
                }
            }
        }

        // --- LÓGICA DA SENHA ---
        // Só entra aqui se o usuário digitou algo no campo de senha
        if (inputSenha && grupoSenha && !grupoSenha.classList.contains('hide') && novaSenha !== "") {
            if (novaSenha.length < 6) {
                if (erroSenha) erroSenha.innerText = "A senha deve ter pelo menos 6 caracteres.";
                erroValidacao = true;
            } else {
                usuarios[index].senha = novaSenha;
                temAlteracao = true;
            }
        }

        // --- SALVAMENTO ---
        if (!erroValidacao && temAlteracao) {
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));

            alert("Dados atualizados com sucesso!");
            window.location.href = "perfil.html";
        } else if (!temAlteracao && !erroValidacao) {
            alert("Nenhuma alteração foi feita.");
        }
    });
});