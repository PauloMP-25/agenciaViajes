// js/destinos/destinosFiltro.js
/* ==============================================================================
Asocia el evento change del select de zonas (Costa, Sierra, Selva) para aplicar 
un filtro sobre los destinos mostrados. Llama a la función renderFunction 
(recibida como argumento) con el valor seleccionado.
================================================================================= */
export function setupFilter(filtroSelect, renderFunction) {
  if (filtroSelect) {
    filtroSelect.addEventListener("change", () => {
      renderFunction(filtroSelect.value);
    });
  }
}
