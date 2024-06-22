// Lógica para gestionar el formulario de envío y pasar a la página de envío
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = 'shipping.html';
});