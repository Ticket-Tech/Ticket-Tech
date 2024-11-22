// Función para manejar la compra del estacionamiento
function purchaseParking(buyerName, buyerEmail) {
    // Aquí deberías verificar si hay espacios disponibles para estacionamiento en tu backend
    // Suponiendo que tenemos una función que consulta al backend sobre los lugares disponibles:
    
    fetch('/api/check-parking-availability')
        .then(response => response.json())
        .then(data => {
            if (data.available) {
                // Si hay espacio, redirige al cliente al link de pago de MercadoPago
                window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=YOUR_PAYMENT_LINK&email=${buyerEmail}`;
            } else {
                // Si no hay más espacios, muestra un mensaje de error
                document.getElementById("message").innerText = "Lo siento, ya no hay más espacios disponibles para estacionamiento.";
            }
        })
        .catch(err => {
            console.error("Error al verificar la disponibilidad del estacionamiento:", err);
            document.getElementById("message").innerText = "Hubo un error, por favor intente nuevamente más tarde.";
        });
}
