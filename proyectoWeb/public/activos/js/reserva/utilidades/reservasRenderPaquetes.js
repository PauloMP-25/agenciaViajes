// js/reservas/utilidades/reservasRenderPaquetes.js
/* ==============================================================================
Archivo: reservasRenderPaquetes.js
Descripción: Renderiza dinámicamente los paquetes en un `select` según el destino 
             seleccionado. También se encarga de mostrar "NO HAY PAQUETES" si no existen.
Usado por: reservasDesdeDestinos.js, reservasFormulario.js
=============================================================================== */
export function renderizarPaquetesEnSelect(selectElement, paquetes = []) {
  if (!selectElement) return;

  if (paquetes.length === 0) {
    selectElement.innerHTML = `<option value="">NO HAY PAQUETES</option>`;
    selectElement.disabled = true;
    return;
  }

  selectElement.innerHTML = `<option value="">-- Selecciona un paquete --</option>`;
  paquetes.forEach(paquete => {
    const nombre = (paquete.nombre || "PAQUETE").toUpperCase();
    const seccion = (paquete.seccion || "SECCIÓN").toUpperCase();
    selectElement.innerHTML += `
      <option value="${paquete.paquete_id}" data-precio="${paquete.precio}">
        ${nombre} - ${seccion}
      </option>`;
  });
  selectElement.disabled = false;
}
