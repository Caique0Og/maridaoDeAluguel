class Recomendacoes extends HTMLElement {
    constructor() {
        super();

        fetch('components/recomendacoes-servicos/Recomendacoes.html')
            .then(response => response.text())
            .then(text => {
                this.innerHTML = text;
                this.carregarAvaliacoes(); // Chama a função após o conteúdo ser carregado
            });
    }

    // Função para exibir as avaliações na página
    carregarAvaliacoes() {
        const lista = this.querySelector("#lista-avaliacoes");
        if (!lista) {
            console.error("Elemento 'lista-avaliacoes' não encontrado!");
            return;
        }

        const avaliacoes = [
            { nome: "João Silva", serviço: 'Eletricista', estrelas: 5, comentario: "Ótimo serviço! Profissional pontual e muito educado.", foto: "img/icons8-convidado-masculino-96.png" },
            { nome: "João Silva", serviço: 'Eletricista', estrelas: 4, comentario: "Bom serviço!", foto: "img/icons8-convidado-masculino-96.png" }
        ];

        avaliacoes.forEach(avaliacao => {
            const li = document.createElement("li");
            li.classList.add("avaliacao");
            li.innerHTML = `
                <img src="${avaliacao.foto}" alt="Foto do cliente">
                <strong>${avaliacao.nome}</strong>
                <h3>${avaliacao.serviço}</h3>
                <div class="estrelas">${"⭐".repeat(avaliacao.estrelas)}</div>
                <p>${avaliacao.comentario}</p>
            `;
            lista.appendChild(li);
        });
    }
}

customElements.define('app-recomendacoes-servicos', Recomendacoes);
