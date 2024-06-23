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

//Hacer crecer la letra de las paginas
// document.addEventListener('DOMContentLoaded', function() {
//     const root = document.documentElement; // Acceder al elemento raíz del documento
//     const increaseBtn = document.querySelector('.btn-large.btn-primary.plus'); // Botón +
//     const decreaseBtn = document.querySelector('.btn-large.btn-primary.minus'); // Botón -

//     // Función para cambiar el tamaño de la fuente
//     function changeFontSize(change) {
//         const currentSize = parseFloat(getComputedStyle(root).fontSize);
//         root.style.fontSize = `${currentSize + change}px`;
//         localStorage.setItem('fontSize', root.style.fontSize); // Guardar el tamaño en localStorage
//     }

//     // Eventos de clic para los botones
//     increaseBtn.addEventListener('click', () => changeFontSize(1)); // Aumentar la fuente
//     decreaseBtn.addEventListener('click', () => changeFontSize(-1)); // Disminuir la fuente

//     // Aplicar el tamaño de la fuente guardado al cargar la página
//     if (localStorage.getItem('fontSize')) {
//         root.style.fontSize = localStorage.getItem('fontSize');
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const fontSizeBtn = document.querySelector('.btn-large.btn-primary');
    const fontSizeChanges = [0, 2, 4, 6]; // Cambios en px sobre el tamaño base
    let fontSizeLevel = 0; // Nivel de incremento actual

    // Función para actualizar el tamaño de la fuente
    function applyFontSize() {
        const baseSize = 12; // Asumimos un tamaño base de 12px para simplificar
        let currentSize = parseFloat(localStorage.getItem('fontSize') || baseSize);
        root.style.fontSize = `${currentSize}px`;
        // Actualizar el nivel de tamaño basado en el tamaño actual
        fontSizeLevel = fontSizeChanges.indexOf(currentSize - baseSize);
        if (fontSizeLevel === -1) fontSizeLevel = 0; // Resetea si el valor no está en los cambios definidos
        fontSizeBtn.textContent = `Tamaño de letra ${fontSizeLevel + 1}`;
    }

    // Función para cambiar el tamaño de la fuente
    function updateFontSize() {
        fontSizeLevel = (fontSizeLevel + 1) % fontSizeChanges.length;
        const baseSize = 12;
        const newSize = baseSize + fontSizeChanges[fontSizeLevel];
        localStorage.setItem('fontSize', newSize);
        applyFontSize();
    }

    // Evento de clic para el botón
    fontSizeBtn.addEventListener('click', updateFontSize);

    // Aplicar el tamaño al cargar
    applyFontSize();
});





//NAVEGAR POR TECLADO
document.addEventListener('keydown', function(event) {
    // Selector para obtener todos los elementos enfocables
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(document.querySelectorAll(focusableElements));
    const focusedElement = document.activeElement;
    const currentIndex = focusable.indexOf(focusedElement);

    function moveFocusTo(index) {
        // Asegurarse de que el índice está dentro del rango válido
        index = (index + focusable.length) % focusable.length;
        focusable[index] && focusable[index].focus();
    }

    switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight': // Manejar derecha como abajo
            moveFocusTo(currentIndex + 1);
            event.preventDefault(); // Prevenir el desplazamiento predeterminado del navegador
            break;
        case 'ArrowUp':
        case 'ArrowLeft': // Manejar izquierda como arriba
            moveFocusTo(currentIndex - 1);
            event.preventDefault(); // Prevenir el desplazamiento predeterminado del navegador
            break;
        case 'Enter':
            // Simular clic en elementos enfocados, si es aplicable
            if (focusedElement && typeof focusedElement.click === 'function') {
                focusedElement.click();
            }
            break;
    }
});





document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('cursorToggle');
    let isLarge = false; // Estado inicial del cursor

    button.addEventListener('click', function() {
        if (isLarge) {
            // Cambia a cursor normal
            document.body.classList.remove('cursor-large');
            document.body.classList.add('cursor-normal');
            button.textContent = 'Cursor Normal';
            isLarge = false;
        } else {
            // Cambia a cursor grande
            document.body.classList.remove('cursor-normal');
            document.body.classList.add('cursor-large');
            button.textContent = 'Cursor Grande';
            isLarge = true;
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('cursorToggle');
    let cursorSize = localStorage.getItem('cursorSize') || 0; // Recuperar estado o inicializar en 0
    updateCursor(); // Actualizar al cargar

    button.addEventListener('click', function() {
        cursorSize = (parseInt(cursorSize) + 1) % 4; // Ciclar entre 0-3
        localStorage.setItem('cursorSize', cursorSize); // Guardar estado
        updateCursor(); // Aplicar cambio
    });

    function updateCursor() {
        document.body.className = ''; // Limpiar todas las clases
        switch(parseInt(cursorSize)) {
            case 1:
                document.body.classList.add('cursor-large');
                button.textContent = 'Cursor Grande';
                break;
            case 2:
                document.body.classList.add('cursor-larger');
                button.textContent = 'Cursor Más Grande';
                break;
            case 3:
                document.body.classList.add('cursor-largest');
                button.textContent = 'Cursor Máximo';
                break;
            default:
                document.body.classList.add('cursor-normal');
                button.textContent = 'Cursor Normal';
                break;
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    let tooltipsEnabled = false; 

    const toggleButton = document.getElementById('toggleTooltips');
    toggleButton.addEventListener('click', () => {
        tooltipsEnabled = !tooltipsEnabled;
        toggleButton.textContent = tooltipsEnabled ? 'Tooltips desactivados' : 'Tooltips activados';
    });

    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltips.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltipDiv = document.createElement('div');
        tooltipDiv.className = 'tooltip';
        tooltipDiv.textContent = tooltipText;
        tooltipDiv.style.position = 'absolute';
        tooltipDiv.style.display = 'none';
        document.body.appendChild(tooltipDiv); // Cambio: agregar al body para mejor control de posición

        element.addEventListener('mouseenter', () => {
            if (tooltipsEnabled) {
                const rect = element.getBoundingClientRect();
                tooltipDiv.style.display = 'block';
                tooltipDiv.style.left = `${rect.left + window.scrollX + element.offsetWidth / 2 - tooltipDiv.offsetWidth / 2}px`; // Centrado horizontalmente
                tooltipDiv.style.top = `${rect.top + window.scrollY - tooltipDiv.offsetHeight - 5}px`; // Encima del elemento
            }
        });

        element.addEventListener('mouseleave', () => {
            tooltipDiv.style.display = 'none';
        });
    });
});














