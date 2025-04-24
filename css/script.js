// Simulando avaliações (em um sistema real, esses dados viriam do backend)
const avaliacoes = [
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 4,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 3,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 3,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 4,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    },
    {
        nome: "João Silva",
        serviço: 'Eletricista',
        estrelas: 5,
        comentario: "Ótimo serviço! Profissional pontual e muito educado.",
        foto: "img/icons8-convidado-masculino-96.png"
    }
];

// Função para exibir as avaliações na página
function carregarAvaliacoes() {
    const lista = document.getElementById("lista-avaliacoes");

    avaliacoes.forEach(avaliacao => {
        const li = document.createElement("li");
        li.classList.add("avaliacao");
    
        li.innerHTML = `
            <img src="${avaliacao.foto}" alt="Foto do cliente" width="40" height="40" style="border-radius: 50%;">
            <strong>${avaliacao.nome}</strong>
            <h3>${avaliacao.serviço}</h3>

            <div class="estrelas">${"⭐".repeat(avaliacao.estrelas)}</div>
            <p>${avaliacao.comentario}</p>
        `;

        lista.appendChild(li);
    });
}

// Chamar a função quando a página carregar
document.addEventListener("DOMContentLoaded", carregarAvaliacoes);