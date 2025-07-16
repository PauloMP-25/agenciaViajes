//// js/reservas/utilidades/reservasFormulario.js
/* ==============================================================================
Archivo: verificarLimitePasajeros.js
Descripción: Valida si se puede agregar más pasajeros al formulario, 
             según si el paquete es doble o no.
Usado por: crearFormularioPasajero.js
=============================================================================== */
export function verificarLimitePasajerosPorPaquete() {
  const esDoble = document.getElementById("es_paquete_doble")?.value === "1";
  const total = document.querySelectorAll("#passenger-sections form").length;

  // Buscar el botón solo dentro del formulario principal
  const formularioPrincipal = document.querySelector("#passenger-sections .passenger-section");
  const addBtn = formularioPrincipal?.querySelector("#add-passenger");

  if (!addBtn) {
    console.warn("⚠️ Botón dinámico 'add-passenger' no encontrado en el formulario principal.");
    return;
  }

  if (esDoble && total >= 2) {
    addBtn.disabled = true;
    addBtn.classList.add("opacity-50", "cursor-not-allowed");
    addBtn.title = "Este paquete incluye 2 pasajeros. No puedes agregar más.";
  } else {
    addBtn.disabled = false;
    addBtn.classList.remove("opacity-50", "cursor-not-allowed");
    addBtn.title = "";
  }
}

