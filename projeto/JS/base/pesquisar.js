document.addEventListener("DOMContentLoaded", () => {

    function configurarPesquisa(idInput, idContainer) {
        const input = document.getElementById(idInput);
        const container = document.getElementById(idContainer);

        if (!input || !container) return;

        function filtrar() {
            const termo = input.value.toLowerCase().trim();
            
            if (termo.length === 0) {
                container.style.display = "none";
                container.innerHTML = "";
                return;
            }

            const todas = JSON.parse(localStorage.getItem("receitas") || "[]");

            const filtradas = todas.filter(r => 
                r.nome.toLowerCase().includes(termo) || 
                r.ingredientes.toLowerCase().includes(termo)
            );

            container.innerHTML = "";
            container.style.display = "block";

            if (filtradas.length === 0) {
                container.innerHTML = "<p class='aviso-busca'>Nenhuma receita encontrada.</p>";
                return;
            }

            filtradas.forEach(r => {
                const link = document.createElement("a");
                link.classList.add("item-resultado-busca");
                link.href = `../receitas/exibir_receita.html?id=${r.id}`;
                link.textContent = r.nome;
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