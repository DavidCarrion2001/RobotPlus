function openPopup(url, title) {
    const popupWidth = 800;
    const popupHeight = 600;
    const left = (screen.width - popupWidth) / 2;
    const top = (screen.height - popupHeight) / 4;
    const popupOptions = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`;

    window.open(url, title, popupOptions);
}




document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const fontSizeBtn = document.querySelector('.btn-large.btn-primary');
    const fontSizeChanges = [0, 4, 8, 12]; // Cambios en px sobre el tamaño base
    let fontSizeLevel = 0; // Nivel de incremento actual

    // Función para actualizar el tamaño de la fuente
    function applyFontSize() {
        const baseSize = 16; // Asumimos un tamaño base de 16px para simplificar
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
        const baseSize = 16;
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
    // Recuperar el estado guardado o inicializarlo como falso
    let tooltipsEnabled = localStorage.getItem('tooltipsEnabled') === 'true'; 

    const toggleButton = document.getElementById('toggleTooltips');
    toggleButton.textContent = tooltipsEnabled ? 'Desactivar Tooltips' : 'Activar Tooltips'; // Ajustar el texto del botón según el estado
    toggleButton.addEventListener('click', () => {
        tooltipsEnabled = !tooltipsEnabled;
        toggleButton.textContent = tooltipsEnabled ? 'Desactivar Tooltips' : 'Activar Tooltips';
        localStorage.setItem('tooltipsEnabled', tooltipsEnabled); // Guardar el nuevo estado en localStorage
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





document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('styleToggle');
    // Recuperar el estado guardado o inicializarlo como normal (0)
    let styleIndex = parseInt(localStorage.getItem('styleIndex')) || 0;

    // Aplicar el estilo inicial basado en el valor recuperado
    applyStyles(styleIndex);

    button.addEventListener('click', () => {
        // Incrementar el índice de estilo y aplicar nuevas clases
        styleIndex = (styleIndex + 1) % 3;
        localStorage.setItem('styleIndex', styleIndex); // Guardar el nuevo estado en localStorage
        applyStyles(styleIndex);
    });

    function applyStyles(styleIndex) {
        const images = document.querySelectorAll('img');
        const texts = document.querySelectorAll('body, p, h1, h2, h3, a'); // Ajustar según necesidad

        // Eliminar clases anteriores
        images.forEach(img => {
            img.classList.remove('saturate-low', 'saturate-high');
        });
        texts.forEach(text => {
            text.classList.remove('text-color-low', 'text-color-high');
        });

        switch (styleIndex) {
            case 1: // Saturación Bajo
                images.forEach(img => img.classList.add('saturate-low'));
                texts.forEach(text => text.classList.add('text-color-low'));
                button.textContent = 'Saturación Bajo';
                break;
            case 2: // Saturación Alto
                images.forEach(img => img.classList.add('saturate-high'));
                texts.forEach(text => text.classList.add('text-color-high'));
                button.textContent = 'Saturación Alto';
                break;
            default: // Saturación Normal
                button.textContent = 'Saturación Normal';
                break;
        }
    }
});

















