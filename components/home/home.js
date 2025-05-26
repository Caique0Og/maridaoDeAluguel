
class Home extends HTMLElement {
    constructor(){
        super();

        
        fetch('components/home/home.html')
        .then(response => response.text())
        .then(text => {
            this.innerHTML = text
        })
    }


}


let current = 0;
const items = document.querySelectorAll('.carousel-item');
const interval = 7000;

function showItem(index) {
    items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');

            // Reinicia a animação da imagem
            const img = item.querySelector('img');
            img.classList.remove('img-animate');
            void img.offsetWidth; // força reflow
            img.classList.add('img-animate');

             // Reinicia animação do texto
             const text = item.querySelector('.carousel-text');
             text.classList.remove('text-animate');
             void text.offsetWidth;
             text.classList.add('text-animate');

               // Anima h2
            const h2 = item.querySelector('.carousel-text h2');
            h2.classList.remove('text-animate1');
            void h2.offsetWidth;
            h2.classList.add('text-animate1');

             
        }
    });
}

function nextItem() {
    current = (current + 1) % items.length;
    showItem(current);
}

// Inicialização
showItem(current);
setInterval(nextItem, interval);


customElements.define('app-dashboard', Home)
