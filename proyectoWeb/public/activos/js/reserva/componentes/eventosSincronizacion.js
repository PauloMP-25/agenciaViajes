// js/reserva/componentes/eventosSincronizacion.js
/* ==============================================================================
Archivo: eventosSincronizacion.js  
Descripción: Sincroniza los campos "destino" y "paquete" de formularios adicionales.  
Usado por: reservasFormulario.js  
=============================================================================== */
import { actualizarPrecioTotal } from '../utilidades/reservasPrecios.js';
import { clonarOpcionesSelect } from "../utilidades/clonarOpcionesSelect.js";

export function agregarEventosSincronizacion() {
  const destino = document.getElementById("destino");
  const paquete = document.getElementById("paquete");

  // 🔁 Sincronizar DESTINOS
  if (destino) {
    destino.addEventListener("change", () => {
      const selectsDestinoHijos = document.querySelectorAll('.additional-passenger select[name="destino"]');
      selectsDestinoHijos.forEach(select => {
        clonarOpcionesSelect(destino, select, destino.value);
      });
      actualizarPrecioTotal();
    });
  }

  // 🔁 Sincronizar PAQUETES
  if (paquete) {
    paquete.addEventListener("change", () => {
      const selectsPaqueteHijos = document.querySelectorAll('.additional-passenger select[name="paquete"]');
      selectsPaqueteHijos.forEach(select => {
        clonarOpcionesSelect(paquete, select, paquete.value);
      });
      actualizarPrecioTotal();
    });
  }
}
