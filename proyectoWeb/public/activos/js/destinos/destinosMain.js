// js/destinos/destinosMain.js
/*==============================================================================
--Espera que el DOM esté cargado (DOMContentLoaded).
--Llama a fetchDestinos() para obtener los datos.
--Llama a renderDestinos() para mostrar todas las tarjetas.
--Llama a setupFilter() para permitir filtrar dinámicamente las tarjetas según la zona elegida.
================================================================================= */

import { fetchDestinos } from './destinosAPI.js';
import { renderDestinos } from './destinosRender.js';
import { setupFilter } from './destinosFiltro.js';

document.addEventListener("DOMContentLoaded", async function () {
  let todosLosDestinos = [];
  const contenedor = document.querySelector(".destinos-grid");
  const bannerZona = document.getElementById("banner-zona");
  const filtroSelect = document.getElementById("filtro-destinos");

  try {
    todosLosDestinos = await fetchDestinos();

    // ✅ Validación: revisar si la respuesta es un array
    if (!Array.isArray(todosLosDestinos)) {
      if (todosLosDestinos && todosLosDestinos.error) {
        console.error("⚠️ Error del backend:", todosLosDestinos.error);
        contenedor.innerHTML = `<p class="error-carga">⚠️ Error del servidor: ${todosLosDestinos.error}. Intenta más tarde.</p>`;
      } else {
        console.error("⚠️ La respuesta del backend no es un array:", todosLosDestinos);
        contenedor.innerHTML = `<p class="error-carga">⚠️ No se pudieron cargar los destinos. Intenta más tarde.</p>`;
      }
      return; // ⛔ Detener ejecución si hay error
    }

    // ✅ Renderizar destinos si no hubo error
    renderDestinos(todosLosDestinos, contenedor);

    // ✅ Configurar filtro
    setupFilter(filtroSelect, (filtroZona) => 
      renderDestinos(todosLosDestinos, contenedor, filtroZona));
    
  } catch (err) {
    console.error("❌ Error al cargar destinos:", err);
    contenedor.innerHTML = `<p class="error-carga">❌ Ocurrió un error inesperado al cargar los destinos.</p>`;
  }
});
