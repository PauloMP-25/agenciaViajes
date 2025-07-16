// // js/paquetes/paquetesMain.js
/*==============================================================================
--Espera que el DOM esté cargado (DOMContentLoaded).
--Llama a fetchDestinos() para obtener los datos.
--Llama a renderPaquetes() para mostrar todas las tarjetas de paquetes.
--Llama a setupFilter() para permitir filtrar dinámicamente las tarjetas según la zona elegida.
================================================================================= */


import { fetchPaquetes } from './paquetesAPI.js';
import { renderPaquetes } from './paquetesRender.js';
import { setupFilter } from './paquetesFiltro.js';

document.addEventListener("DOMContentLoaded", async function () {
  const selector = document.getElementById("selector-region");
  const contenedores = {
    doble: document.querySelector(".grid-paquetes[data-categoria='doble']"),
    economico: document.querySelector(".grid-paquetes[data-categoria='economico']"),
    vip: document.querySelector(".grid-paquetes[data-categoria='vip']"),
    ejecutivo: document.querySelector(".grid-paquetes[data-categoria='ejecutivo']")
  };

  let todosLosPaquetes = [];

  try {
    todosLosPaquetes = await fetchPaquetes();
    renderPaquetes(todosLosPaquetes, contenedores); // render inicial
  } catch (err) {
    console.error("Error al cargar paquetes:", err);
  }

  setupFilter(selector, (paquetes, filtroZona) => {
  renderPaquetes(paquetes, contenedores, filtroZona);
  }, todosLosPaquetes);
});
