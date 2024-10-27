let totalPrice = 0;
const selectedOptions = {};

// Función para alternar la selección de una opción y actualizar el total
function toggleOption(option, price) {
    const optionElement = document.getElementById(option);
    if (selectedOptions[option]) {
        delete selectedOptions[option];
        optionElement.classList.remove('selected');
        totalPrice -= price;
    } else {
        selectedOptions[option] = price;
        optionElement.classList.add('selected');
        totalPrice += price;
    }
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Modal para los métodos de pago
const modal = document.getElementById("paymentModal");
const modalContent = document.getElementById("paymentInfo");
const span = document.getElementsByClassName("close")[0];

// Función para seleccionar el método de pago y mostrar el modal
function selectPaymentMethod(method) {
    let info = "";
    switch (method) {
        case 'debit-card':
            info = "Has seleccionado pagar con tarjeta de débito.";
            break;
        case 'mercadopago':
            info = "Has seleccionado pagar con MercadoPago.";
            break;
        case 'personalpay':
            info = "Has seleccionado pagar con Personal Pay.";
            break;
    }
    modalContent.textContent = info;
    modal.style.display = "block";
}

// Cerrar el modal cuando se haga clic en la X
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
