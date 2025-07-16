// js/paquetes/paquetesFiltro.js
/* ==============================================================================
Asocia el evento change del select de zonas (Costa, Sierra, Selva) para aplicar 
un filtro sobre los paquetes mostrados. Llama a la función renderFunction 
(recibida como argumento) con el valor seleccionado.
================================================================================= */
export function setupFilter(selector, renderFunction, paquetes) {
  if (selector) {
    selector.addEventListener("change", () => {
      renderFunction(paquetes, selector.value);
    });
  }
}