// js/reserva/componentes/rellenarSelectPaquetes.js
/* ==============================================================================
Archivo: rellenarSelectPaquetes.js
Descripción: Llena el <select> de paquetes con los datos del destino seleccionado.
Usado por: reservasDesdePaquetes.js, reservasDesdeDestinos.js
=============================================================================== */
export function rellenarSelectPaquetes(selectPaquete, paquetes = [], idSeleccionado = null) {
  if (!selectPaquete) return;

  if (paquetes.length === 0) {
    selectPaquete.innerHTML = `<option value="">NO HAY PAQUETES</option>`;
    selectPaquete.disabled = true;
    return;
  }

  // Agregar opción manual: "Viajar sin paquete"
  selectPaquete.innerHTML = `<option value="">Viajar sin paquete</option>`;

  paquetes.forEach(p => {
    const nombre = (p.nombre || 'PAQUETE').toUpperCase();
    const seccion = (p.seccion || 'SECCION').toUpperCase();
    const seleccionado = (p.paquete_id === idSeleccionado) ? 'selected' : '';

    selectPaquete.innerHTML += `
      <option value="${p.paquete_id}" data-precio="${p.precio}" ${seleccionado}>
        ${nombre} - ${seccion}
      </option>`;
  });

  selectPaquete.disabled = false;
}
