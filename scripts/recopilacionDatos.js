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

// Guardar los datos y redirigir al link de pago correspondiente
async function saveAndRedirect() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;

    // Determinar el tipo de compra y el link de pago
    let paymentLink;
    let referenceCode;

    if (selectedOptions['entrada'] && selectedOptions['vip']) {
        paymentLink = "https://www.mercadopago.com/link-entrada-vip";
        referenceCode = "ENTRADA_VIP";
    } else if (selectedOptions['vip']) {
        paymentLink = "https://www.mercadopago.com/link-vip";
        referenceCode = "VIP";
    } else if (selectedOptions['entrada']) {
        paymentLink = "https://www.mercadopago.com/link-entrada";
        referenceCode = "ENTRADA";
    } else {
        alert("Por favor selecciona al menos una opción para continuar.");
        return;
    }

    const purchaseData = {
        nombre,
        apellido,
        correo,
        referenceCode,
        total: totalPrice
    };

    try {
        const response = await fetch('/api/create-purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchaseData)
        });

        if (response.ok) {
            window.location.href = paymentLink;
        } else {
            alert("Hubo un error al registrar tu compra. Intenta de nuevo.");
        }
    } catch (error) {
        console.error("Error en la conexión con el backend:", error);
    }
}
