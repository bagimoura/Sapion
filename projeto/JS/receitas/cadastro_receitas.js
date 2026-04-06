document.addEventListener("DOMContentLoaded", () => {

    const formCadastro = document.getElementById("cadastrar-receita");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const container = document.getElementById("lista-receitas");

    function mascaraNomeReceita() {
        const inputNomeReceita = document.getElementById("nome_receita");
        const erroNomeReceita = document.getElementById("erro-nomeReceita"); 
        
        let nome = inputNomeReceita.value;
        let nomeLetras = "";

        for (const c of nome) {
            if (isNaN(c) || c === " ") {
                nomeLetras += c
            }
        }

        // 2. CAPITALIZAÇÃO
        let palavras = nomeLetras.split(" ")
        for (let i = 0; i < palavras.length; i++) {
            if (palavras[i].length > 0) {
                palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substring(1).toLowerCase()
            }
        }
        
        // Atualiza o campo imediatamente
        inputNomeReceita.value = palavras.join(" ");
        nome = inputNomeReceita.value.trim(); // Pega o nome formatado e sem espaços nas pontas

        // 3. FEEDBACK VISUAL EM TEMPO REAL (para o campo de nome)
        if (nome.length === 0) {
            erroNomeReceita.textContent = "";
            inputNomeReceita.style.borderColor = "";
        } else if (nome.length < 3) {
            erroNomeReceita.textContent = "O nome deve ter pelo menos 3 caracteres.";
            erroNomeReceita.style.color = "red";
            inputNomeReceita.style.borderColor = "red";
        } else {
            erroNomeReceita.textContent = "";
            inputNomeReceita.style.borderColor = "green";
        }
    }
    
    // Adiciona o listener de tempo real
    const inputNomeReceita = document.getElementById("nome_receita");
    if (inputNomeReceita) {
        inputNomeReceita.addEventListener("input", mascaraNomeReceita);
    }

    
    //Validacao RECEITA
    function validarReceita(nome, ingredientes, preparo, tempo, porcoes, categoria, dificuldade) {
        //NOME
        if (!nome || nome.trim().length < 3) {
            alert("O Nome da Receita é obrigatório e deve ter pelo menos 3 caracteres.");
            document.getElementById("nome_receita").focus();
            return false;
        }

        //INGREDIENTES 
        if (!ingredientes || ingredientes.trim().length === 0) {
            alert("O campo Ingredientes é obrigatório.");
            document.getElementById("ingredientes").focus();
            return false;
        }

        //MODO DE PREPARO
        if (!preparo || preparo.trim().length === 0) {
            alert("O campo Modo de Preparo é obrigatório.");
            document.getElementById("preparo").focus();
            return false;
        }

        //TEMPO
        const tempoLimpo = tempo ? tempo.trim() : '0';
        const tempoNum = parseInt(tempoLimpo);
        //TEMPO
        if (isNaN(tempoNum) || tempoNum <= 0) {
            alert("O Tempo de Preparo deve ser um número válido e maior que zero (em minutos).");
            document.getElementById("tempo").focus();
            return false;
        }
        
        const porcoesLimpo = porcoes ? porcoes.trim() : '0';
        const porcoesNum = parseInt(porcoesLimpo);
        //PORCOES
        if (isNaN(porcoesNum) || porcoesNum <= 0) {
            alert("O campo Porções deve ser um número válido e maior que zero.");
            document.getElementById("porcoes").focus();
            return false;
        }

        //CATEGORIA
        if (categoria === "geral" || !categoria) {
            alert("Selecione uma Categoria para a receita.");
            // Não há focus fácil para radio buttons, mas o alert já avisa
            return false;
        }
        
        //DIFICULDADE
        if (dificuldade === "geral" || !dificuldade) {
            alert("Selecione um nível de Dificuldade para a receita.");
            return false;
        }

        return true;
    }

    //cadastra receita
    if (formCadastro) {
        formCadastro.addEventListener("submit", function(event) {
            event.preventDefault();

            let nome_receita = document.getElementById("nome_receita").value;
            let ingredientes = document.getElementById("ingredientes").value;
            let preparo = document.getElementById("preparo").value;
            let tempo = document.getElementById("tempo").value;
            let porcoes = document.getElementById("porcoes").value;
        
            let categoriaSelecionada = document.querySelector('input[name="categoria"]:checked');
            let valorCategoria = categoriaSelecionada ? categoriaSelecionada.value : "geral";

            let dificuldadeSelecionada = document.querySelector('input[name="dificuldade"]:checked');
            let valorDificuldade = dificuldadeSelecionada ? dificuldadeSelecionada.value : "geral";

            let inputFoto = document.getElementById("foto_receita");
            let arquivo = inputFoto.files[0];

            if (!validarReceita(nome_receita, ingredientes, preparo, tempo, porcoes, valorCategoria, valorDificuldade)) {
                return; 
            }

            const salvar = (img) => {
                let novaReceita = {
                    id: Date.now(),
                    nome: nome_receita,
                    imagem: img,
                    ingredientes: ingredientes,
                    preparo: preparo,
                    tempo: tempo,
                    porcoes: porcoes,
                    dificuldade: valorDificuldade,
                    categoria: valorCategoria,
                    autor: usuarioLogado.email
                };

                let listaReceitas = JSON.parse(localStorage.getItem("receitas") || "[]");
                
                listaReceitas.push(novaReceita);

                localStorage.setItem("receitas", JSON.stringify(listaReceitas));

                alert("Receita cadastrada com sucesso!");
                window.location.href = "../base/home.html"; 
            };

            if (arquivo) {
                const reader = new FileReader();
                reader.onload = function(evento) {
                    salvar(evento.target.result); 
                };
                reader.readAsDataURL(arquivo);
            } else {
                salvar("../../IMGS/padrao.png");
            }
        });
    }

//exibe receita
if (container) {
    
    //container.innerHTML = "";
    const filtroDaPagina = container.getAttribute("data-categoria");
    let todasReceitas = JSON.parse(localStorage.getItem("receitas") || "[]");
    let receitasFiltradas = [];

    if (filtroDaPagina === "minhas-receitas") {
        receitasFiltradas = todasReceitas.filter(receita => receita.autor === usuarioLogado.email);
    }else{
        receitasFiltradas = todasReceitas.filter(receita => receita.categoria === filtroDaPagina);
    }

    if (receitasFiltradas.length > 0) {
        receitasFiltradas.forEach(receita => {

            const novoCard = document.createElement("div");
            novoCard.classList.add("card-receita");
            let botoesAdmin = "";

            if (usuarioLogado && receita.autor === usuarioLogado.email) {
                botoesAdmin = `
                    <div class="acoes-card">
                            <button class="btn-editar">Editar</button>
                            <button class="btn-excluir">Excluir</button>
                    </div>
                `;
            }

            let classeAtivo = "";
            if (usuarioLogado && usuarioLogado.favoritos && usuarioLogado.favoritos.includes(receita.id)) {
                classeAtivo = "ativo";
            }
            
            novoCard.innerHTML = `
                <button class="btn-favorito ${classeAtivo}">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                <a href="../receitas/exibir_receita.html?id=${receita.id}">
                    <img src="${receita.imagem}" alt="${receita.nome}">
                    <h3>${receita.nome}</h3>
                </a>
                ${botoesAdmin}
            `;

            const btnFavorito = novoCard.querySelector(".btn-favorito");
            if (btnFavorito) {
                btnFavorito.addEventListener("click", (e) => {
                    e.preventDefault();
                    
                    let usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"));

                    if (!usuarioAtual) {
                        alert("Faça login para favoritar receitas!");
                        return;
                    }

                    if (!usuarioAtual.favoritos) {
                        usuarioAtual.favoritos = [];
                    }

                    const index = usuarioAtual.favoritos.indexOf(receita.id);

                    if (index === -1) {
                        usuarioAtual.favoritos.push(receita.id);
                        btnFavorito.classList.add("ativo");
                    } else {
                        usuarioAtual.favoritos.splice(index, 1);
                        btnFavorito.classList.remove("ativo");
                    }

                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual));
                });
            }

            const btnExcluir = novoCard.querySelector(".btn-excluir");
            const btnEditar = novoCard.querySelector(".btn-editar");

            if(btnExcluir){
                btnExcluir.addEventListener("click", (e) => {
                    e.preventDefault();

                    if(confirm("Deseja excluir esta receita?")) {
                        todasReceitas = todasReceitas.filter(item => item.id !== receita.id);
                        localStorage.setItem("receitas", JSON.stringify(todasReceitas));
                        novoCard.remove();
                        alert("Receita excluída!");
                    }
                });
            }
            

            if (btnEditar) {
                btnEditar.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.location.href = `../receitas/editar_receita.html?id=${receita.id}`;
                });
            }


            container.appendChild(novoCard);
        });
    }
}

// receitas favoritas

const receitasFavoritas = document.getElementById("receitas_favoritas");

if (receitasFavoritas) {
    let todasReceitas = JSON.parse(localStorage.getItem("receitas") || "[]");
    let usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioAtual || !usuarioAtual.favoritos || usuarioAtual.favoritos.length === 0) {
        receitasFavoritas.innerHTML = "<p style='text-align:center; width:100%; color:#666;'>Você ainda não tem receitas favoritas.</p>";
    } else {
        
        const listaFavoritas = todasReceitas.filter(receita => usuarioAtual.favoritos.includes(receita.id));

        if (listaFavoritas.length === 0) {
             receitasFavoritas.innerHTML = "<p style='text-align:center; width:100%; color:#666;'>Nenhuma receita encontrada.</p>";
        } else {
            listaFavoritas.forEach(receita => {
                const novoCard = document.createElement("div");
                novoCard.classList.add("card-receita");

                let botoesAdmin = "";
                if (receita.autor === usuarioAtual.email) {
                    botoesAdmin = `
                        <div class="acoes-card">
                             <button class="btn-editar">Editar</button>
                             <button class="btn-excluir">Excluir</button>
                        </div>
                    `;
                }

                novoCard.innerHTML = `
                    <button class="btn-favorito ativo">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                    <a href="../receitas/exibir_receita.html?id=${receita.id}">
                        <img src="${receita.imagem}" alt="${receita.nome}">
                        <h3>${receita.nome}</h3>
                    </a>
                    ${botoesAdmin}
                `;

                const btnFavorito = novoCard.querySelector(".btn-favorito");
                btnFavorito.addEventListener("click", (e) => {
                    e.preventDefault();
                    
                    let user = JSON.parse(localStorage.getItem("usuarioLogado"));
                    const index = user.favoritos.indexOf(receita.id);
                    
                    if (index > -1) {
                        user.favoritos.splice(index, 1);
                        localStorage.setItem("usuarioLogado", JSON.stringify(user));
                        
                        novoCard.remove();

                        if (user.favoritos.length === 0) {
                            receitasFavoritas.innerHTML = "<p style='text-align:center; width:100%; color:#666;'>Você não tem mais favoritos.</p>";
                        }
                    }
                });

                const btnExcluir = novoCard.querySelector(".btn-excluir");
                if (btnExcluir) {
                    btnExcluir.addEventListener("click", (e) => {
                        e.preventDefault();
                        if (confirm("Deseja excluir esta receita?")) {
                            let receitasAtualizadas = JSON.parse(localStorage.getItem("receitas") || "[]");
                            receitasAtualizadas = receitasAtualizadas.filter(item => item.id !== receita.id);
                            localStorage.setItem("receitas", JSON.stringify(receitasAtualizadas));
                            
                            let user = JSON.parse(localStorage.getItem("usuarioLogado"));
                            const indexFav = user.favoritos.indexOf(receita.id);
                            if (indexFav > -1) {
                                user.favoritos.splice(indexFav, 1);
                                localStorage.setItem("usuarioLogado", JSON.stringify(user));
                            }

                            novoCard.remove();
                            alert("Receita excluída!");
                            
                            if (receitasFavoritas.querySelectorAll(".card-receita").length === 0) {
                                 receitasFavoritas.innerHTML = "<p style='text-align:center; width:100%; color:#666;'>Nenhuma receita encontrada.</p>";
                            }
                        }
                    });
                }

                const btnEditar = novoCard.querySelector(".btn-editar");
                if (btnEditar) {
                    btnEditar.addEventListener("click", (e) => {
                        e.preventDefault();
                        window.location.href = `../receitas/editar_receita.html?id=${receita.id}`;
                    });
                }

                receitasFavoritas.appendChild(novoCard);
            });
        }
    }
}



    const tituloDetalhe = document.getElementById("v-nome");

    if (tituloDetalhe) {
        const params = new URLSearchParams(window.location.search);
        const idUrl = params.get("id");
        
        const receitas = JSON.parse(localStorage.getItem("receitas") || "[]");
        const r = receitas.find(item => item.id == idUrl);

        if (r) {
            document.title = r.nome;

            document.getElementById("v-nome").innerText = r.nome;
            document.getElementById("v-tempo").innerText = r.tempo;
            document.getElementById("v-porcoes").innerText = r.porcoes;
            document.getElementById("v-dificuldade").innerText = r.dificuldade;
            document.getElementById("v-foto").src = r.imagem;

            const listaIng = document.getElementById("v-ingredientes");
            r.ingredientes.split("\n").forEach(linha => {
                if(linha.trim()) listaIng.innerHTML += `<li>${linha}</li>`;
            });

            const listaPrep = document.getElementById("v-preparo");
            r.preparo.split("\n").forEach(linha => {
                if(linha.trim()) listaPrep.innerHTML += `<li>${linha}</li>`;
            });

        } else {
            tituloDetalhe.innerText = "Receita não encontrada!";
        }
    }

    

});