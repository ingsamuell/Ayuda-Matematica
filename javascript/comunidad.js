// comunidad.js
// Lógica para comentarios de usuarios en la página Comunidad

document.addEventListener('DOMContentLoaded', function() {
    // Limpia todos los comentarios y los ids propios (solo para reiniciar la página)
    localStorage.removeItem('comentariosComunidad');
    localStorage.removeItem('misComentariosComunidad');
    const form = document.getElementById('comentario-form');
    const lista = document.getElementById('comentarios-lista');


    // Cargar comentarios guardados en localStorage
    let comentarios = JSON.parse(localStorage.getItem('comentariosComunidad')) || [];
    let misIds = JSON.parse(localStorage.getItem('misComentariosComunidad')) || [];
    renderComentarios();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value.trim() || 'Anónimo';
        const mensaje = document.getElementById('mensaje').value.trim();
        if (!mensaje) return;
        // Generar un id único para el comentario
        const id = Date.now() + Math.random().toString(36).slice(2);
        const nuevoComentario = { id, usuario, mensaje };
        comentarios.push(nuevoComentario);
        misIds.push(id);
        localStorage.setItem('comentariosComunidad', JSON.stringify(comentarios));
        localStorage.setItem('misComentariosComunidad', JSON.stringify(misIds));
        form.reset();
        renderComentarios();
    });

    function renderComentarios() {
        lista.innerHTML = '';
        if (comentarios.length === 0) {
            lista.innerHTML = '<p style="text-align:center;color:#888;">Sé el primero en comentar.</p>';
            return;
        }
        comentarios.slice().reverse().forEach((comentario, idx, arr) => {
            const div = document.createElement('div');
            div.className = 'comentario';
            div.innerHTML = `<span class="usuario">${comentario.usuario}</span><p>${comentario.mensaje}</p>`;
            // Permitir eliminar cualquier comentario propio, incluso si es el primero
            if (misIds.includes(comentario.id)) {
                const btn = document.createElement('button');
                btn.textContent = 'Eliminar';
                btn.className = 'eliminar-comentario';
                btn.style.marginTop = '8px';
                btn.onclick = function() {
                    comentarios = comentarios.filter(c => c.id !== comentario.id);
                    misIds = misIds.filter(mid => mid !== comentario.id);
                    localStorage.setItem('comentariosComunidad', JSON.stringify(comentarios));
                    localStorage.setItem('misComentariosComunidad', JSON.stringify(misIds));
                    renderComentarios();
                };
                div.appendChild(btn);
            }
            lista.appendChild(div);
        });
    }
});
