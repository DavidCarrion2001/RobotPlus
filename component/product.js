// Funciones para aplicar los filtros de daltonismo
function applyFilter(filter) {
    document.body.className = ''; // Reinicia la clase del body
    document.body.classList.add(filter);
}

// Event listeners para los botones de Power Ups
document.querySelectorAll('#powerups button').forEach(button => {
    button.addEventListener('click', (event) => {
        const filter = event.target.textContent.trim();
        switch (filter) {
            case 'Protanopia':
                applyFilter('protanopia');
                break;
            case 'Deuteranopia':
                applyFilter('deuteranopia');
                break;
            case 'Tritanopia':
                applyFilter('tritanopia');
                break;
            case 'Achromatopsia':
                applyFilter('achromatopsia');
                break;
            default:
                applyFilter('');
        }
    });
});

// Lógica para gestionar la cantidad de producto y agregar al carrito
document.querySelector('.decrease').addEventListener('click', () => {
    let quantity = document.querySelector('#quantity');
    if (quantity.value > 1) {
        quantity.value--;
    }
});

document.querySelector('.increase').addEventListener('click', () => {
    let quantity = document.querySelector('#quantity');
    quantity.value++;
});

document.querySelector('.add-to-cart').addEventListener('click', () => {
    alert('Producto agregado al carrito');
    // Lógica para agregar el producto al carrito
});