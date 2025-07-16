// js/reservas/servicios/reservasConfirmacionAPI.js
/* ==============================================================================
Archivo: reservasConfirmacionAPI.js
Descripción: Enviará los datos de reserva del formulario al backend para ser almacenados.
Usado por: reservasMain.js (cuando se implemente confirmación de reservas)
============================================================================== */
import { fetchJSON } from '../../api/apiHelper.js';

/* ==============================================================================
Servicios de API para confirmar y registrar reservas
================================================================================= */
export const enviarReserva = (data) =>
  fetchJSON('/api/reservas', data, 'POST');