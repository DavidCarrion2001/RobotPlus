// Lógica para gestionar la selección del método de envío y pasar a la página de pago
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = 'payment.html';
});