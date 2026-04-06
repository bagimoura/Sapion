document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const idReceitaAtual = params.get("id") || document.body.getAttribute("data-id");
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    let listaDeAvaliacoes = JSON.parse(localStorage.getItem('banco_avaliacoes')) || [];
    const areaComentarios = document.getElementById("comentarios-publicados");

    const listaEstrelas = document.querySelectorAll('.star.rating');
    
    listaEstrelas.forEach(estrela => {
        estrela.addEventListener('click', function(e) {
            let elementoEstrela = e.currentTarget;
            let containerPai = elementoEstrela.parentNode;
            containerPai.setAttribute('data-stars', elementoEstrela.dataset.rating);
        });
    });

    const formularioAvaliacao = document.getElementById("form-avaliacao");

    if (formularioAvaliacao) {
        formularioAvaliacao.addEventListener("submit", function(event) {
            event.preventDefault();

            if (!idReceitaAtual) {
                return;
            }

            let nomeUsuario = usuarioLogado.nome;
            let emailUsuario = usuarioLogado.email;
            let textoComentario = document.getElementById("comentario").value;
            let notaAvaliacao = document.getElementById("estrelas-container").getAttribute("data-stars") || "1";

            const novaAvaliacao = {
                idComentario: Date.now(),
                idReceita: idReceitaAtual, 
                nome: nomeUsuario,
                email: emailUsuario,
                texto: textoComentario,
                nota: notaAvaliacao
            };

            listaDeAvaliacoes.push(novaAvaliacao);
            localStorage.setItem('banco_avaliacoes', JSON.stringify(listaDeAvaliacoes));

            renderizarCard(novaAvaliacao);

            formularioAvaliacao.reset();
            document.getElementById("estrelas-container").setAttribute("data-stars", "1");
        });
    }  

    function renderizarCard(dados) {
        const novoCard = document.createElement("div");
        novoCard.classList.add("card-comentario");

        let notaNumerica = parseInt(dados.nota);
        let estrelasVisuais = '★'.repeat(notaNumerica) + '☆'.repeat(5 - notaNumerica);
        let botaoExcluirHTML = '';

        if (usuarioLogado && usuarioLogado.email === dados.email) {
            botaoExcluirHTML = '<button class="btn-excluirComment">🗑️ Excluir</button>';
        }

        novoCard.innerHTML = `
            <h3>${dados.nome}</h3>
            ${botaoExcluirHTML}
            <div class="card-nota">${estrelasVisuais}</div>
            <p>${dados.texto}</p>
        `;

        const excluirComment = novoCard.querySelector(".btn-excluirComment");

        if(excluirComment){
            excluirComment.addEventListener("click", (e) => {
                e.preventDefault();
                listaDeAvaliacoes = listaDeAvaliacoes.filter(item => item.idComentario !== dados.idComentario);

                localStorage.setItem('banco_avaliacoes', JSON.stringify(listaDeAvaliacoes));

                novoCard.remove();
            })
        }

        areaComentarios.appendChild(novoCard);
    }

    const avaliacoesDestaPagina = listaDeAvaliacoes.filter(x => x.idReceita === idReceitaAtual);

    avaliacoesDestaPagina.forEach(avaliacao => {
        renderizarCard(avaliacao);
    });
  
});