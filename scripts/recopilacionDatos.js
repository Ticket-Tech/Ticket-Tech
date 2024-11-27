let totalPrice = 0;
const selectedOptions = {};

// Función para alternar la selección de una opción y actualizar el total
function toggleOption(option, price) {
    // Primero, desmarcar todas las opciones
    document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));

    // Seleccionar la opción actual
    const optionElement = document.getElementById(option);
    optionElement.classList.add('selected');
    
    // Actualizar el precio total según la opción seleccionada
    totalPrice = price;
    document.getElementById('totalPrice').textContent = totalPrice;
    
    // Guardar la opción seleccionada
    selectedOptions[option] = price;

    // Si ya hay una opción seleccionada, eliminarla
    if (Object.keys(selectedOptions).length > 1) {
        Object.keys(selectedOptions).forEach(key => {
            if (key !== option) {
                delete selectedOptions[key];
            }
        });
    }
}

// Guardar los datos y redirigir al link de pago correspondiente
async function saveAndRedirect() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;

    // Validar que se haya seleccionado una opción
    if (Object.keys(selectedOptions).length === 0) {
        alert("Por favor selecciona una opción para continuar.");
        return;
    }

    // Determinar el tipo de compra y el link de pago
    let paymentLink;
    let referenceCode;

    if (selectedOptions['entrada-vip']) {
        paymentLink = "https://www.mercadopago.com/checkout/v1/redirect?pref_id=YOUR_PAYMENT_LINK_ENTRADA_VIP";
        referenceCode = "ENTRADA_VIP";
    } else if (selectedOptions['vip']) {
        paymentLink = "https://www.mercadopago.com/checkout/v1/redirect?pref_id=YOUR_PAYMENT_LINK_VIP";
        referenceCode = "VIP";
    } else if (selectedOptions['entrada']) {
        paymentLink = "https://mpago.la/2g9doGM";
        referenceCode = "ENTRADA";
    }

    const purchaseData = {
        nombre,
        apellido,
        correo,
        referenceCode,
        total: totalPrice
    };

    try {
        // Enviar datos al backend
        const response = await fetch('https://bkd-ticket-872218208040.southamerica-west1.run.app/api/confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchaseData)
        });

        if (response.ok) {
            // Redirigir al link de pago
            window.location.href = paymentLink;
        } else {
            alert("Hubo un error al registrar tu compra. Intenta de nuevo.");
        }
    } catch (error) {
        console.error("Error en la conexión con el backend:", error);
    }
}
