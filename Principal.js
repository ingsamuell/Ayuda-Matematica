// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {

    // Define una clase llamada Dropdown
    class Dropdown {
        // El constructor de la clase recibe un botón como parámetro
        constructor(button) {
            this.button = button; // Asigna el botón a una propiedad de la instancia
            // Obtiene el elemento del dropdown asociado al botón usando el atributo data-target
            this.dropdown = document.getElementById(button.getAttribute('data-target'));
            this.init(); // Llama al método init para inicializar los eventos
        }

        // Método para inicializar los eventos
        init() {
            // Agrega un event listener al botón para que llame al método toggle cuando se haga clic
            this.button.addEventListener('click', () => this.toggle());
        }

        // Método para alternar la visibilidad del dropdown
        toggle() {
            // Si el dropdown tiene la clase 'show', llama al método hide, de lo contrario, llama al método show
            if (this.dropdown.classList.contains('show')) {
                this.hide();
            } else {
                this.show();
            }
        }

        // Método para mostrar el dropdown
        show() {
            this.dropdown.classList.add('show'); // Agrega la clase 'show' al dropdown
            // Establece la altura máxima del dropdown a su altura total para que se despliegue
            this.dropdown.style.maxHeight = this.dropdown.scrollHeight + "px";
        }

        // Método para ocultar el dropdown
        hide() {
            this.dropdown.classList.remove('show'); // Remueve la clase 'show' del dropdown
            // Establece la altura máxima del dropdown a null para que se colapse
            this.dropdown.style.maxHeight = null;
        }
    }

    // Selecciona todos los elementos con la clase 'dropdown-btn' y crea una instancia de Dropdown para cada uno
    document.querySelectorAll('.dropdown-btn').forEach(button => new Dropdown(button));
});