// dropdown.js
// Lógica para los menús desplegables de exámenes

class Dropdown {
    constructor(button) {
        this.button = button;
        this.dropdown = document.getElementById(button.getAttribute('data-target'));
        this.init();
    }


    init() {
        this.button.addEventListener('click', () => this.toggle());
        // Ocultar el dropdown cuando el mouse salga del contenedor
        this.dropdown.addEventListener('mouseleave', () => {
            if (this.dropdown.classList.contains('show')) {
                this.hide();
            }
        });
    }

    toggle() {
        if (this.dropdown.classList.contains('show')) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.dropdown.classList.add('show');
        this.dropdown.style.maxHeight = this.dropdown.scrollHeight + "px";
    }

    hide() {
        this.dropdown.classList.remove('show');
        this.dropdown.style.maxHeight = null;
    }
}

export function initDropdowns() {
    document.querySelectorAll('.dropdown-btn').forEach(button => new Dropdown(button));
}
