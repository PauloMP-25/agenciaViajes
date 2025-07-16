// js/reserva/componentes/generarCampo.js
/* ==============================================================================
Genera dinámicamente campos del formulario (inputs y selects).
Usado por: crearFormularioPasajero.js
=============================================================================== */
export function generarCampo(id, label, placeholder, esAdicional, esSelect = false, tipo = 'text') {
  const attr = `id="${id}" name="${id}"`;

  if (esSelect && id === 'destino') {
    return `
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">${label}</label>
        <select ${attr} ${!esAdicional ? `id="${id}"` : ''} required class="input-field">
          <option value="">${placeholder}</option>
        </select>
      </div>`;
  }

  if (esSelect && id === 'paquete') {
    return `
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">${label}</label>
        <select ${attr} ${!esAdicional ? `id="${id}"` : ''} required class="input-field">
          <option value="">Seleccione un paquete</option>
        </select>
      </div>`;
  }

  return `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">${label}</label>
      <input ${attr} type="${tipo}" placeholder="${placeholder}" required class="input-field"/>
    </div>`;
}
