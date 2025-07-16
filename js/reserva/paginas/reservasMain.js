// js/reserva/paginas/reservasMain.js
/* ==============================================================================
Archivo: reservasMain.js
Descripción: Punto de entrada general de la sección de reservas. Se encarga de 
             decidir desde qué flujo (manual, desde paquetes o destinos) se carga 
             la reserva. Puede leer parámetros en la URL o usar una configuración.
Usado por: página principal de reservas
============================================================================== */

import { inicializarDesdeDestino } from './reservasDesdeDestinos.js';
import { inicializarDesdePaquete } from './reservasDesdePaquetes.js';
import { cargarModoManual } from './reservasManual.js';
import { configurarBotonReserva } from '../utilidades/procesarReserva.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const destinoId = params.get("destino_id");
  const paqueteId = params.get("paquete_id");

  try {
    if (paqueteId) {
      await inicializarDesdePaquete(paqueteId);
    } else if (destinoId) {
      await inicializarDesdeDestino(destinoId);
    } else {
      await cargarModoManual();
    }

    // ✅ Solo una vez, fuera del if
    configurarBotonReserva();

  } catch (error) {
    console.error("❌ Error al inicializar reservas:", error);
  }
});
