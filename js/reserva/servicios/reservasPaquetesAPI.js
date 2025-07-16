// js/reservas/servicios/reservasPaquetesAPI.js
import { fetchJSON } from '../../api/apiHelper.js';

/* ==============================================================================
Servicios de API para obtener datos de paquetes relacionados a reservas
Usado por: reservasDesdePaquetes, reservasFormulario, etc.
================================================================================= */

// ✅ Obtener paquete y destino juntos
export const obtenerPaqueteYDestino = (paqueteId) =>
  fetchJSON(`/api/reservas/paquetes/${paqueteId}`, null);

// ✅ Obtener todos los paquetes por destino específico
export const obtenerPaquetesPorDestino = (destinoId) =>
  fetchJSON(`/api/paquetes/destino/${destinoId}`, []);

