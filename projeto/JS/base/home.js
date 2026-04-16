// document.addEventListener("DOMContentLoaded", () => {

//   function titleCase(str) {
//     return str.toLowerCase()
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
//   }

let indiceAtual = 1;
mostrarSlide(indiceAtual);

function mudarSlide(n) {
  mostrarSlide(indiceAtual += n);
}

function slideAtual(n) {
  mostrarSlide(indiceAtual = n);
}

function mostrarSlide(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let pontos = document.getElementsByClassName("ponto");
  
  if (n > slides.length) {indiceAtual = 1}    
  if (n < 1) {indiceAtual = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  for (i = 0; i < pontos.length; i++) {
    pontos[i].className = pontos[i].className.replace(" ativo", "");
  }
  
  slides[indiceAtual-1].style.display = "block";  
  pontos[indiceAtual-1].className += " ativo";
}

setInterval(function() {
    mudarSlide(1);
}, 5000);
  
  //barra de pesquisa
//   let listaQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
//   const inputPesquisa = document.getElementById("barra-pesquisa");
//   const boxSugestoes = document.getElementById("resultados-pesquisa");

//   if (inputPesquisa && boxSugestoes){
    
//     inputPesquisa.addEventListener("input", function(e) {
//       e.target.value = titleCase(e.target.value);

//       const termo = e.target.value.toLowerCase(); //deixa o texto minúsculo
//       boxSugestoes.innerHTML = ""; //limpa os resultados anteriores

//       //se estiver vazio, limpa
//       if (termo === "") {
//         boxSugestoes.style.display = "none";
//         return;
//       }

//       //filtra de acordo com o título
//       const resultados = listaQuizzes.filter(receita => 
//         receita.nome.toLowerCase().includes(termo) //deixa tudo minúsculo e pesquisa o que foi digitado
//       );

//       //se achou algo, desenha os mini cards
//       if (resultados.length > 0) {

//         boxSugestoes.style.display = "block"; //mostra a caixa

//         resultados.forEach(receita => {
//           //cria o link de acordo com o id da receita
//           const link = document.createElement("a");
//           link.href = "../../receitas/exibir_receita.html?id=${receita.id};" //envia para a página de exibir receitas
//           link.classList.add("mini-card"); //adiciona o estilo

//           //coloca foto e título
//           link.innerHTML = `
//               <img src="${receita.imagem}" alt="${receita.nome}">
//               <span>${receita.nome}</span>
//           `;

//           boxSugestoes.appendChild(link);

//         });

//       }else{
//           //se nada foi encontrado, a caixa não é desenhada
//           boxSugestoes.style.display = "none";
//       }
//     });

//     //fecha a busca se clicar fora dela
//     document.addEventListener("click", (e) => {
//       if (!inputPesquisa.contains(e.target) && !boxSugestoes.contains(e.target)){
//         boxSugestoes.style.display = "none"; //esconde a caixa
//       }
//     });

//   }

// });