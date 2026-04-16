document.addEventListener("DOMContentLoaded", () => {
    
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const params = new URLSearchParams(window.location.search);
    const idEdicao = params.get("id");
    const form = document.getElementById("cadastrar-quiz");

    let listaQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const quizOriginal = listaQuizzes.find(r => r.id == idEdicao);

    if (!quizOriginal){
        alert("Quiz não encontrado!");
        window.location.href = "../base/home.html";
        return;
    }

    if (quizOriginal.autor !== usuarioLogado.email) {
        alert("Você não tem permissão para editar este quiz.");
        window.location.href = "../base/home.html";
        return;
    }

    //preenchimento do form de acordo com o id do quiz
    //MUDAR DE ACORDO COM AS INFOS DO QUIZ
    document.getElementById("nome_quiz").value = quizOriginal.nome;
    document.getElementById("ingredientes").value = quizOriginal.ingredientes;
    document.getElementById("preparo").value = quizOriginal.preparo;
    document.getElementById("tempo").value = quizOriginal.tempo;
    document.getElementById("porcoes").value = quizOriginal.porcoes;

    //marca os radios de acordo com o value do quiz original
    const radioCategoria = document.querySelector(`input[name="categoria"][value="${quizOriginal.categoria}"]`);
    if(radioCategoria)radioCategoria.checked = true;

    const radioDificuldade = document.querySelector(`input[name="dificuldade"][value="${quizOriginal.dificuldade}"]`);
    if(radioDificuldade)radioDificuldade.checked = true;


    //salva as alterações
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        //pega os dados novos sobrescritos no form
        let nomeNovo = document.getElementById("nome_quiz").value;
        let ingredientesNovo = document.getElementById("ingredientes").value;
        let preparoNovo = document.getElementById("preparo").value;
        let tempoNovo = document.getElementById("tempo").value;
        let porcoesNovo = document.getElementById("porcoes").value;
        
        let catInput = document.querySelector('input[name="categoria"]:checked');
        let difInput = document.querySelector('input[name="dificuldade"]:checked');
        
        let categoriaNova = catInput ? catInput.value : quizOriginal.categoria;
        let dificuldadeNova = difInput ? difInput.value : quizOriginal.dificuldade;
        const inputFoto = document.getElementById("foto_quiz");

        //atualiza os dados no array
        const atualizarBanco = (imagemFinal) => {
            
            //puxa índice do quiz na lista pra substituir
            const index = listaQuizzes.findIndex(r => r.id == idEdicao);
            
            //se tiver encontrado o quiz
            if(index !== -1) {
                //atualiza o que foi editado e mantém o id e autor do post
                listaQuizzes[index].nome = nomeNovo;
                listaQuizzes[index].ingredientes = ingredientesNovo;
                listaQuizzes[index].preparo = preparoNovo;
                listaQuizzes[index].tempo = tempoNovo;
                listaQuizzes[index].porcoes = porcoesNovo;
                listaQuizzes[index].categoria = categoriaNova;
                listaQuizzes[index].dificuldade = dificuldadeNova;
                listaQuizzes[index].imagem = imagemFinal;

                //salva no localstorage
                localStorage.setItem("quizzes", JSON.stringify(listaQuizzes));

                alert("Quiz atualizado com sucesso!");
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
            atualizarBanco(quizOriginal.imagem); 
        }
    });
});