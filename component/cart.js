function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

// Agregar la lógica para gestionar los elementos del carrito
document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
        // Lógica para eliminar el artículo del carrito
    });
});