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
    const telefono = document.getElementById('reg-telefono').value;

    console.log(`Canasta Registrada: ID ${id} para donante ${telefono}`);

    // Guarda el ID y redirige a la página de éxito
    saveTrackingID(id);
    window.location.href = 'success.html';
}

function initializeSuccessScreen() {
    const id = getTrackingID();
    document.getElementById('confirmed-id').textContent = id;
    document.getElementById('qr-text').textContent = id;
}

function verifyCanasta(event) {
    event.preventDefault();
    const id = document.getElementById('scan-input').value;

    if (id) {
        document.getElementById('delivery-details').style.display = 'block';
        document.getElementById('scan-form').style.display = 'none';
        document.getElementById('delivery-id').textContent = id;
        document.getElementById('scan-input-hidden').value = id;
    } else {
        alert('Por favor, ingrese un ID para verificar.');
    }
}

// FFunción mockeada de la entrega
function completeDelivery() {
    const id = document.getElementById('scan-input-hidden').value;

    alert(`¡Entrega ${id} marcada como COMPLETADA! El registro inmutable ha finalizado.`);

    window.location.href = 'index.html';
}

// Lógica para simular el rastreo (se ejecuta al enviar el formulario en rastreo.html)
function trackDonation(event) {
    event.preventDefault();
    const rastreoIdInput = document.getElementById('rastreo-id');
    const id = rastreoIdInput.value.trim();
    const resultadoDiv = document.getElementById('rastreo-resultado');
    const idMostrar = document.getElementById('rastreo-id-mostrar');
    
    const lastID = getTrackingID(); 

    if (id === lastID) {
        idMostrar.textContent = id;
        resultadoDiv.style.display = 'block';
        alert(`ID ${id} encontrado. Mostrando estado de rastreo mockeado.`);
        
    } else if (id === 'VL-9348-1A') {
        idMostrar.textContent = id;
        resultadoDiv.style.display = 'block';
        
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => {
            item.classList.remove('current', 'pending');
            item.classList.add('done');
        });
        document.querySelector('.timeline-item:last-child p').innerHTML = '🎉 **Entrega Finalizada** (Verificado con foto adjunta)';
        alert(`ID ${id} encontrado. ¡Entrega completada!`);

    } else {
        // ID no encontrado o inválido
        resultadoDiv.style.display = 'none';
        alert('ID no encontrado. Por favor, verifique el código de trazabilidad.');
    }
}