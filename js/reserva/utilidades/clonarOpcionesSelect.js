// js/reservas/utilidades/clonarOpciones.js
/* ==============================================================================
Archivo: clonarOpciones.js
Descripción: Clona las opciones de un <select> origen hacia un <select> destino,
             manteniendo atributos como data-precio y el valor seleccionado.
Usado por: crearFormularioPasajero.js
============================================================================== */
// js/reserva/utilidades/clonarOpcionesSelect.js
export function clonarOpcionesSelect(origenSelect, destinoSelect, valorSeleccionado) {
  destinoSelect.innerHTML = '';
  origenSelect.querySelectorAll("option").forEach(opt => {
    const nueva = document.createElement("option");
    nueva.value = opt.value;
    nueva.textContent = opt.textContent;

    [...opt.attributes].forEach(attr => {
      if (attr.name.startsWith('data-')) {
        nueva.setAttribute(attr.name, attr.value);
      }
    });

    destinoSelect.appendChild(nueva);
  });

  destinoSelect.value = valorSeleccionado;
  destinoSelect.disabled = true;
  destinoSelect.dispatchEvent(new Event("change")); // Para disparar sincronización dependiente
}
