// js/reserva/paginas/reservasFormulario.js
/* ==============================================================================
Archivo: reservasFormulario.js
Descripción: Punto de entrada para inicializar el formulario de reservas
Usado por: página principal de reservas
============================================================================== */
import { crearFormularioPasajero } from "../componentes/crearFormularioPasajero.js";
import { agregarEventosSincronizacion } from "../componentes/eventosSincronizacion.js";
import { actualizarPrecioTotal } from "../utilidades/reservasPrecios.js";

export function inicializarFormularioPasajeros() {
  const passengerSections = document.getElementById("passenger-sections");

  if (!passengerSections) {
    console.warn("⚠️ Contenedor de secciones de pasajeros no encontrado.");
    return;
  }

  const formularioExistente = passengerSections.querySelector(".formulario-pasajero");

  if (formularioExistente) {
    console.warn("⚠️ Ya existe un formulario de pasajero. Se omitió creación inicial.");
    return;
  }

  crearFormularioPasajero(passengerSections, false);

  agregarEventosSincronizacion();
  actualizarPrecioTotal();
}

