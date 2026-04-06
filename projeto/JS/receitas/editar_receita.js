document.addEventListener("DOMContentLoaded", () => {
    
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const params = new URLSearchParams(window.location.search);
    const idEdicao = params.get("id");
    const form = document.getElementById("cadastrar-receita");

    let listaReceitas = JSON.parse(localStorage.getItem("receitas") || "[]");
    const receitaOriginal = listaReceitas.find(r => r.id == idEdicao);

    if (!receitaOriginal){
        alert("Receita não encontrada!");
        window.location.href = "../base/home.html";
        return;
    }

    if (receitaOriginal.autor !== usuarioLogado.email) {
        alert("Você não tem permissão para editar esta receita.");
        window.location.href = "../base/home.html";
        return;
    }

    //preenchimento do form de acordo com o id da receita
    document.getElementById("nome_receita").value = receitaOriginal.nome;
    document.getElementById("ingredientes").value = receitaOriginal.ingredientes;
    document.getElementById("preparo").value = receitaOriginal.preparo;
    document.getElementById("tempo").value = receitaOriginal.tempo;
    document.getElementById("porcoes").value = receitaOriginal.porcoes;

    //marca os radios de acordo com o value da receita original
    const radioCategoria = document.querySelector(`input[name="categoria"][value="${receitaOriginal.categoria}"]`);
    if(radioCategoria)radioCategoria.checked = true;

    const radioDificuldade = document.querySelector(`input[name="dificuldade"][value="${receitaOriginal.dificuldade}"]`);
    if(radioDificuldade)radioDificuldade.checked = true;


    //salva as alterações
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        //pega os dados novos sobrescritos no form
        let nomeNovo = document.getElementById("nome_receita").value;
        let ingredientesNovo = document.getElementById("ingredientes").value;
        let preparoNovo = document.getElementById("preparo").value;
        let tempoNovo = document.getElementById("tempo").value;
        let porcoesNovo = document.getElementById("porcoes").value;
        
        let catInput = document.querySelector('input[name="categoria"]:checked');
        let difInput = document.querySelector('input[name="dificuldade"]:checked');
        
        let categoriaNova = catInput ? catInput.value : receitaOriginal.categoria;
        let dificuldadeNova = difInput ? difInput.value : receitaOriginal.dificuldade;
        const inputFoto = document.getElementById("foto_receita");

        //atualiza os dados no array
        const atualizarBanco = (imagemFinal) => {
            
            //puxa índice da receita na lista pra substituir
            const index = listaReceitas.findIndex(r => r.id == idEdicao);
            
            //se tiver encontrado a receita
            if(index !== -1) {
                //atualiza o que foi editado e mantém o id e autor do post
                listaReceitas[index].nome = nomeNovo;
                listaReceitas[index].ingredientes = ingredientesNovo;
                listaReceitas[index].preparo = preparoNovo;
                listaReceitas[index].tempo = tempoNovo;
                listaReceitas[index].porcoes = porcoesNovo;
                listaReceitas[index].categoria = categoriaNova;
                listaReceitas[index].dificuldade = dificuldadeNova;
                listaReceitas[index].imagem = imagemFinal;

                //salva no localstorage
                localStorage.setItem("receitas", JSON.stringify(listaReceitas));

                alert("Receita atualizada com sucesso!");
                window.location.href = "../base/home.html";
            }
        };

        //se enviou uma foto nova
        if (inputFoto.files && inputFoto.files[0]) {
            //converte a foto
            const reader = new FileReader();
            reader.onload = function(evento) {
                atualizarBanco(evento.target.result); //salva a foto nova e chama a função
            };
            reader.readAsDataURL(inputFoto.files[0]);
        } else {
            //se não tem foto nova, mantém a antiga e chama a função
            atualizarBanco(receitaOriginal.imagem); 
        }
    });
});