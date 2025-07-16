// js/reserva/componentes/rellenarSelectDestinos.js
/* ==============================================================================
Archivo: rellenarSelectDestinos.js
Descripción: Llena el <select> de destinos con los datos recibidos.
Usado por: reservasDesdePaquetes.js, reservasDesdeDestinos.js
=============================================================================== */
export function rellenarSelectDestinos(selectDestino, destinos, idSeleccionado = null) {
  selectDestino.innerHTML = `<option value="">-- Selecciona destino --</option>`;
  destinos.forEach(dest => {
    const nombre = (dest.nombre || 'DESTINO').toUpperCase();
    const seleccionado = dest.destino_id === idSeleccionado ? 'selected' : '';
    selectDestino.innerHTML += `
      <option value="${dest.destino_id}" data-precio="${dest.precio}" ${seleccionado}>
        ${nombre}
      </option>`;
  });
}