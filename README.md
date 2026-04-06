# Sapion
Site para projeto de Interação Humano Computador e Verificação, Validação e Teste de software
- Criar uma branch para cada tarefa/atualização

1. Iniciando o Projeto

    git init: Transforma a pasta atual em um repositório Git, criando uma pasta oculta .git nela.

    git clone <url-do-github>: Em vez de iniciar do zero, este comando copia um projeto inteiro do GitHub para a sua máquina, já configurando a conexão com o repositório remoto.

2. Visualizando e Salvando Alterações

    git status: O comando mais usado. Mostra em qual branch você está, quais arquivos foram modificados e quais estão na Área de Preparação.

    git add <nome-do-arquivo>: Move um arquivo específico (ou git add . para mover todos os arquivos modificados de uma vez) para a Área de Preparação.

    git commit -m "Sua mensagem descritiva": Tira a "fotografia" da Área de Preparação e salva no Repositório Local. A mensagem deve ser clara sobre o que foi feito.

3. Ramificações (Branches)

    git branch: Lista todas as branches locais. A que estiver com um asterisco (*) é a que você está usando no momento.

    git branch <nome-da-branch>: Cria uma nova branch.

    git switch <nome-da-branch> (ou o antigo git checkout <nome-da-branch>): Muda para a branch especificada.

    git checkout -b <nome-da-branch>: Cria uma nova branch a partir da atual.

    git merge <nome-da-branch>: Junta o trabalho feito em uma branch à branch em que você está no momento (geralmente, você vai para a main e faz o merge da branch da nova funcionalidade).

5. Manipulando o Histórico

    git log: Mostra o histórico de commits do repositório, indicando quem fez, quando, e qual foi a mensagem.

    git log --oneline: Mostra o mesmo histórico, mas resumido a uma linha por commit (útil para históricos longos).

6. Trabalhando com o GitHub (Repositório Remoto)

    git remote add origin <url-do-github>: Conecta o seu repositório local a um repositório vazio no GitHub (necessário apenas se você começou com git init em vez de git clone).

    git push -u origin <nome-da-branch>: Envia os seus commits locais para o GitHub. A flag -u cria a ligação entre a sua branch local e a branch remota na primeira vez. Depois, basta usar apenas git push.

    git pull: Puxa todas as atualizações que estão no GitHub e as mescla no seu repositório local. Fundamental rodar antes de começar a trabalhar, caso outra pessoa tenha mexido no código.
