document.addEventListener("DOMContentLoaded", () => {

    function configurarPesquisa(idInput, idContainer) {
        const input = document.getElementById(idInput);
        const container = document.getElementById(idContainer);

        if (!input || !container) return;

        function filtrar() {
            console.log("Filtrando quizzes...");
            const termo = input.value.toLowerCase().trim();
            
            if (termo.length === 0) {
                container.style.display = "none";
                container.innerHTML = "";
                return;
            }

            const todos = JSON.parse(localStorage.getItem("quizzes") || "[]");

            const filtradas = todos.filter((q) => 
                q.titulo.toLowerCase().includes(termo)    
            );

            container.innerHTML = "";
            container.style.display = "block";

            if (filtradas.length === 0) {
                container.innerHTML = "<p class='aviso-busca'>Nenhum quiz encontrado.</p>";
                return;
            }

            filtradas.forEach(q => {
                const link = document.createElement("a");
                link.classList.add("item-resultado-busca");
                link.href = `../quizzes/exibir_quiz.html?id=${q.id}`;
                link.textContent = q.titulo;
                container.appendChild(link);
            });
        }

        input.addEventListener("input", filtrar);
        
        document.addEventListener("click", (e) => {
            if (!input.contains(e.target) && !container.contains(e.target)) {
                container.style.display = "none";
            }
        });
    }

    configurarPesquisa("barra-pesquisa", "lista-menu");
    configurarPesquisa("barra-pesquisa-grande", "lista-grande");
});