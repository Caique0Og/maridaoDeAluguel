document.addEventListener("DOMContentLoaded", () => {
    const historicoContainer = document.querySelector(".historico");
    const botaoAdicionar = document.getElementById("adicionarPedido");

    const iconesServicos = {
        "Eletricista": "🔌",
        "Chaveiro": "🔑",
        "Encanador": "🚰",
        "Pintor": "🎨",
        "Pedreiro": "🧱",
        "Jardineiro": "🌿"
    };

    // Função para carregar o histórico de pedidos salvos no localStorage
    function carregarHistorico() {
        // Limpa o conteúdo do histórico antes de carregar novos pedidos

        const pedidos = JSON.parse(localStorage.getItem("historicoPedidos")) || [];

        if (pedidos.length === 0) {
            historicoContainer.innerHTML += "<p>Você ainda não fez nenhum pedido.</p>";
            return;
        }

        pedidos.forEach((pedido, index) => {
            const pedidoDiv = document.createElement("div");
            pedidoDiv.classList.add("pedido");

            const icone = iconesServicos[pedido.servico] || "❓";
            const estrelas = gerarEstrelas(pedido.avaliacao);

            pedidoDiv.innerHTML = `
                <div class="pedido-info">
                    <span class="icone-servico">${icone}</span><br>
                    <h3>${pedido.servico}</h3><br> <p> ${pedido.data}</p><br>
                    <p><strong>Nome:</strong> ${pedido.profissional}</p><br>
                    <div class="avaliacao-historico">
                    ${estrelas}
                    </div>
                    <button class="removerPedido" data-index="${index}">Remover</button>
                </div>
            `;

            historicoContainer.appendChild(pedidoDiv);

            // Adiciona evento de remoção ao botão
            const botaoRemover = pedidoDiv.querySelector(".removerPedido");
            botaoRemover.addEventListener("click", removerPedido);
        });
    }

    // Função para gerar a string de estrelas de acordo com a avaliação
    function gerarEstrelas(avaliacao) {
        let estrelas = '';
        for (let i = 0; i < 5; i++) {
            if (i < avaliacao) {
                estrelas += '⭐';
            } else {
                estrelas += '☆';
            }
        }
        return estrelas;
    }

    // Função para adicionar um novo pedido ao histórico e salvar no localStorage
    function adicionarPedido() {
        const servico = prompt("Digite o serviço que deseja adicionar (Ex: Eletricista, Chaveiro, etc.):");
        if (!servico) return;

        const profissional = prompt("Digite o nome do profissional:");
        if (!profissional) return;

        const avaliacao = prompt("Dê uma avaliação de 1 a 5 estrelas:");
        if (!avaliacao || isNaN(avaliacao) || avaliacao < 1 || avaliacao > 5) {
            alert("Avaliação inválida! Digite um número entre 1 e 5.");
            return;
        }

        const pedidos = JSON.parse(localStorage.getItem("historicoPedidos")) || [];
        const novoPedido = { 
            servico, 
            profissional, 
            avaliacao, 
            data: new Date().toLocaleString()
        };
        pedidos.push(novoPedido);
        localStorage.setItem("historicoPedidos", JSON.stringify(pedidos));
        carregarHistorico();
    }

    // Função para remover um pedido do histórico
    function removerPedido(event) {
        const index = event.target.getAttribute("data-index");
        const pedidos = JSON.parse(localStorage.getItem("historicoPedidos")) || [];
        pedidos.splice(index, 1); // Remove o pedido

        // Atualiza o localStorage e recarrega o histórico
        localStorage.setItem("historicoPedidos", JSON.stringify(pedidos));
        carregarHistorico(); // Atualiza a interface com o novo histórico
    }

    botaoAdicionar.addEventListener("click", adicionarPedido);
    carregarHistorico();
});
