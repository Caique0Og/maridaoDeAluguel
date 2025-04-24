
class Menu extends HTMLElement {
    constructor(){
        super();

        
        fetch('components/menu/Menu.html')
        .then(response => response.text())
        .then(text => {
            this.innerHTML = text
        })
    }

}
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}
customElements.define('app-menu', Menu)