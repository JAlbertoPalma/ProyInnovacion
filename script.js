// Genera un ID mockeado de trazabilidad
function generateTrackingID() {
    return 'VL-' + Math.floor(1000 + Math.random() * 9000) + '-1A';
}

// Guarda el ID para transferirlo entre páginas (Mock de sesión/BD)
function saveTrackingID(id) {
    localStorage.setItem('lastRegisteredID', id);
}

// Obtiene el último ID guardado
function getTrackingID() {
    return localStorage.getItem('lastRegisteredID') || 'ID no encontrado';
}

// Inicializa el formulario de registro al cargar la página
function initializeRegisterScreen() {
    let newID = generateTrackingID();
    document.getElementById('reg-id').value = newID;
}

// Lógica de registro (se ejecuta al enviar el formulario)
function registerCanasta(event) {
    event.preventDefault();

    const id = document.getElementById('reg-id').value;
    const correo = document.getElementById('reg-correo').value;

    console.log(`Canasta Registrada: ID ${id} para donante ${correo}`);

    // Guarda el ID y redirige a la página de éxito
    saveTrackingID(id);
    window.location.href = 'success.html';
}

// Inicializa la pantalla de éxito al cargar
function initializeSuccessScreen() {
    const id = getTrackingID();
    document.getElementById('confirmed-id').textContent = id;
    document.getElementById('qr-text').textContent = id;
}

// Lógica de verificación en la pantalla de entrega
function verifyCanasta(event) {
    event.preventDefault();
    const id = document.getElementById('scan-input').value;

    if (id) {
        // Simulación de encontrar el registro
        document.getElementById('delivery-details').style.display = 'block';
        document.getElementById('scan-form').style.display = 'none';
        document.getElementById('delivery-id').textContent = id;
        document.getElementById('scan-input-hidden').value = id;
    } else {
        alert('Por favor, ingrese un ID para verificar.');
    }
}

// FUNCIÓN MOCKEADA DE ENTREGA FINAL
function completeDelivery() {
    const id = document.getElementById('scan-input-hidden').value;

    alert(`¡Entrega ${id} marcada como COMPLETADA! El registro inmutable ha finalizado.`);

    // Regresa al menú principal
    window.location.href = 'index.html';
}