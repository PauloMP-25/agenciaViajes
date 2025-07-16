// js/reserva/componentes/manejarCambioPaquetes.js
/* ==============================================================================
Archivo: manejarCambioPaquete.js
Descripción: Asigna el listener para calcular y actualizar el precio al cambiar el paquete.
             También detecta si el paquete es doble (2x1) y ajusta la lógica del botón de agregar pasajero.
Usado por: reservasDesdePaquetes.js, reservasDesdeDestinos.js
=============================================================================== */
import { actualizarPrecioTotal } from "../utilidades/reservasPrecios.js";

export function manejarCambioPaquete(selectPaquete, inputOculto) {
  selectPaquete.onchange = () => {
    actualizarPrecioTotal();

    // Actualizar campo oculto del paquete
    if (inputOculto) {
      inputOculto.value = selectPaquete.value || "Viajar Sin Paquete";
    }

    // 🚩 Detectar si es "Doble" (2x1)
    const nombrePaquete = selectPaquete.selectedOptions[0]?.textContent.toLowerCase();
    const esDoble = nombrePaquete?.includes("doble") || nombrePaquete?.includes("2x1");

    // Crear o actualizar campo oculto de flag "es_paquete_doble"
    let flag = document.getElementById("es_paquete_doble");
    if (!flag) {
      flag = document.createElement("input");
      flag.type = "hidden";
      flag.id = "es_paquete_doble";
      flag.name = "es_paquete_doble";
      const form = document.getElementById("reservation-form");
      if (form) form.appendChild(flag);
    }
    flag.value = esDoble ? "1" : "0";

    // Validar si ya hay 2 formularios activos y desactivar botón si es necesario
    const addBtn = document.getElementById("add-passenger");
    const totalForms = document.querySelectorAll("#passenger-sections form").length;

    if (addBtn) {
      if (esDoble && totalForms >= 2) {
        addBtn.disabled = true;
        addBtn.classList.add("opacity-50", "cursor-not-allowed");
        addBtn.title = "Este paquete incluye 2 pasajeros. No puedes agregar más.";
      } else {
        addBtn.disabled = false;
        addBtn.classList.remove("opacity-50", "cursor-not-allowed");
        addBtn.title = "";
      }
    }
  };
}
