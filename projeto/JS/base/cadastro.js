document.addEventListener("DOMContentLoaded", () => {

    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const inputSenha = document.getElementById("senha");

    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroSenha = document.getElementById("erro-senha");

    const form = document.getElementById("form-cadastro");
    const listaErros = document.getElementById("erros"); 

    //NOME
    function validoNome() {
        nome = inputNome.value
        erroNome.style.color = "red";
        nomeLetras = ""

        for (const c of nome) {
            if (isNaN(c) || c === " ") {
                nomeLetras += c
            }
        }

        let palavras = nomeLetras.split(" ")
        for (let i = 0; i < palavras.length; i++) {
            if (palavras[i].length > 0) {
                palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substring(1).toLowerCase()
            }
        }
        inputNome.value = palavras.join(" ");
        nome = inputNome.value.trim();

        // Validação
        if (nome.length === 0) {
            erroNome.textContent = "";
            inputNome.style.borderColor = ""; 
            return false;
        } 
        else if (nome.length < 3) {
            erroNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
            inputNome.style.borderColor = "red";
            return false;
        } else {
            erroNome.textContent = "";
            inputNome.style.borderColor = "green";
            return true;
        }
    } 
    inputNome.addEventListener("input", validoNome);


    // EMAIL
    function validoEmail() {
        let email = inputEmail.value.trim();
        erroEmail.style.color = "red";
        erroEmail.textContent = "";
        inputEmail.style.borderColor = "red"; 

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            erroEmail.textContent = "Insira um e-mail válido (ex: nome@dominio.com).";
            return false;
        } 
        
        let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const usuarioExistente = usuarios.find(user => user.email === email);
        
        if (usuarioExistente) {
            erroEmail.textContent = "Este e-mail já está cadastrado!";
            return false;
        }

        erroEmail.textContent = "";
        inputEmail.style.borderColor = "green";
        return true;
    }
    inputEmail.addEventListener("blur", validoEmail);
    

    //SENHA 
    function validoSenha() {
        let senha = inputSenha.value.trim();
        erroSenha.style.color = "red";
        inputSenha.style.borderColor = "red";
        
        let erros = [];
        if (senha.length < 8) { erros.push("A senha deve ter pelo menos 8 caracteres."); }
        if (!(/[A-Z]/.test(senha))) { erros.push("A senha deve ter uma letra maiúscula."); }
        if (!(/[a-z]/.test(senha))) { erros.push("A senha deve ter uma letra minúscula."); }
        if (!(/[0-9]/.test(senha))) { erros.push("A senha deve ter um número."); }
        if (!(/[^A-Za-z0-9]/.test(senha))) { erros.push("A senha deve ter um caractere especial."); }

        if (erros.length > 0) {
            erroSenha.textContent = erros[0]; 
            return false;
        } else {
            erroSenha.textContent = "Senha válida!";
            erroSenha.style.color = "green";
            inputSenha.style.borderColor = "green";
            return true;
        }
    } 
    inputSenha.addEventListener("blur", validoSenha);
    

    //ENVIAR
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isNomeValido = validoNome();
        let isEmailValido = validoEmail();
        let isSenhaValida = validoSenha();

        let comErro = !(isNomeValido && isEmailValido && isSenhaValida);

        // Limpa lista de erros 
        listaErros.innerHTML = "";
        const h3Existente = form.querySelector("h3");
        if(h3Existente) {
            h3Existente.remove();
        }

        if (comErro) {
            const errosSpans = [
                { id: "Nome", content: erroNome.textContent },
                { id: "Email", content: erroEmail.textContent },
                { id: "Senha", content: erroSenha.textContent }
            ];

            const h3 = document.createElement("h3");
            h3.textContent = "Por favor, corrija os erros abaixo:";
            h3.style.color = "red";
            listaErros.insertAdjacentElement('beforebegin', h3);
            
            errosSpans.forEach(erro => {
                if (erro.content !== "" && !erro.content.includes("válida")) {
                    const li = document.createElement("li");
                    li.textContent = `Campo ${erro.id}: ${erro.content}`;
                    listaErros.appendChild(li);
                }
            });
            
            alert("Erro no Cadastro. Verifique a lista de erros!");
            
        } else {
            // CADASTRO 
            
            let nome = inputNome.value.trim();
            let email = inputEmail.value.trim();
            let senha = inputSenha.value.trim();

            let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            
            //criando objeto de usuário
            let usuario = {
                nome: nome,
                email: email,
                senha: senha,
                receitas: [] 
            }
            
            //adiciona o usuário no array
            usuarios.push(usuario);

            //salva o array no localstorage
            localStorage.setItem ("usuarios", JSON.stringify(usuarios)) ;

            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html";
        }
    });
    
});