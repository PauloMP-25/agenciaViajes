// js/reservas/utilidades/reservasPrecios.js
/* ==============================================================================
Archivo: reservasValidaciones.js
Descripción: Función que valida la cantidad de pasajeros en caso de paquetes dobles (2x1).
             Activa o desactiva el botón de añadir pasajero según la condición.
Usado por: reservasFormulario.js
=============================================================================== */
export function verificarLimitePasajerosPorPaquete() {
  const esDoble = document.getElementById("es_paquete_doble")?.value === "1";
  const totalPasajeros = document.querySelectorAll("#passenger-sections form").length;
  const addBtn = document.getElementById("add-passenger");

  if (esDoble && totalPasajeros >= 2) {
    addBtn.disabled = true;
    addBtn.classList.add("opacity-50", "cursor-not-allowed");
    addBtn.title = "Este paquete incluye 2 pasajeros. No puedes agregar más.";
  } else {
    addBtn.disabled = false;
    addBtn.classList.remove("opacity-50", "cursor-not-allowed");
    addBtn.title = "";
  }
}