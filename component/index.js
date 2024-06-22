function openPopup(url, title) {
    const popupWidth = 800;
    const popupHeight = 600;
    const left = (screen.width - popupWidth) / 2;
    const top = (screen.height - popupHeight) / 4;
    const popupOptions = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`;

    window.open(url, title, popupOptions);
}

function openModal(productName, videoUrl) {
    document.getElementById('productModal').style.display = 'flex';
    document.getElementById('productName').innerText = productName;
    document.getElementById('productVideo').src = videoUrl;
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('productVideo').src = '';
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    let modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement; // Acceder al elemento raíz del documento
    const increaseBtn = document.querySelector('.btn-large.btn-primary.plus'); // Botón +
    const decreaseBtn = document.querySelector('.btn-large.btn-primary.minus'); // Botón -

    // Función para cambiar el tamaño de la fuente
    function changeFontSize(change) {
        const currentSize = parseFloat(getComputedStyle(root).fontSize);
        root.style.fontSize = `${currentSize + change}px`;
        localStorage.setItem('fontSize', root.style.fontSize); // Guardar el tamaño en localStorage
    }

    // Eventos de clic para los botones
    increaseBtn.addEventListener('click', () => changeFontSize(1)); // Aumentar la fuente
    decreaseBtn.addEventListener('click', () => changeFontSize(-1)); // Disminuir la fuente

    // Aplicar el tamaño de la fuente guardado al cargar la página
    if (localStorage.getItem('fontSize')) {
        root.style.fontSize = localStorage.getItem('fontSize');
    }
});
